import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  walletConnectDepositThunk,
  dispatchManualThunk,
  nowPaymentsDepositThunk,
  completeOrder,
  setError as setTxError,
  failedOrder,
} from "../../store/slices/transactionSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import {
  useAccount,
  useSwitchChain,
  useWalletClient,
  useConnect,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet, bsc, sepolia, bscTestnet } from "viem/chains";
import { ethers } from "ethers";
import ManualDeposit from "./manual-deposit";

const IS_TESTNET = true;
// Payment method configs
// const paymentConfigs = {
//   nowpayment: {
//     coins: ["ETH", "USDT (TRC-20)", "USDT (ERC-20)", "USDT (BEP-20)"],
//     chains: {
//       ETH: "ETH",
//       BNB: "BNB",
//       "USDT (TRC-20)": "TRON",
//       "USDT (ERC-20)": "ETH",
//       "USDT (BEP-20)": "Binance Smart Chain (BSC)",
//     },
//   },
// };

const paymentConfigs = {
  nowpayment: {
    coins: ["USDT (ERC-20)", "USDT (BEP-20)", "ETH"],
    chains: {
      ETH: "ETH",
      BNB: "BNB",
      "USDT (ERC-20)": "ETH",
      "USDT (BEP-20)": "Binance Smart Chain (BSC)",
    },
  },
};

const DepositFunds = () => {
  const [amount, setAmount] = useState("");
  const [depositCoin, setDepositCoin] = useState("USDT.BSC");
  const [paymentChain, setPaymentChain] = useState("");
  const [txnOrderId, setOrderId] = useState("");
  const [agree, setAgree] = useState(false);
  const [showmanualdeposit, setShowManualDeposit] = useState(false);
  const [btnloading, setButtonLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ capxError: "" });
  const [depositMethod, setDepositMethod] = useState("nowpayment");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walletConnect } = useSelector((s) => s.transaction);
  const { address, isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { connectAsync } = useConnect();
  const { writeContractAsync } = useWriteContract();

  const { data: walletClient } = useWalletClient();

  const ETH_CHAIN = IS_TESTNET ? sepolia : mainnet;
  const BNB_CHAIN = IS_TESTNET ? bscTestnet : bsc;


  const [orderId, setManualOrderId] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [orderCurrency, setOrderCurrency] = useState("");
  const [orderDepositAddress, setOrderDepositAddress] = useState("");


  // Update chain when coin changes
  useEffect(() => {
    const chain = paymentConfigs.nowpayment.chains[depositCoin] || "";
    setPaymentChain(chain);
  }, [depositCoin]);

  useEffect(() => {
    if (formErrors.capxError) {
      const t = setTimeout(() => setFormErrors({ capxError: "" }), 4000);
      return () => clearTimeout(t);
    }
  }, [formErrors.capxError]);

  const ensureConnectedAndCorrectChain = async (targetChain) => {
    try {
      const { connector } = await connectAsync({ connector: injected() });
      if (chain?.id !== targetChain.id) {
        await switchChainAsync({ chainId: targetChain.id });
      }
    } catch (err) {
      throw new Error("Please connect and switch to the correct network using MetaMask.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonLoading(true);
    if (!agree) return setFormErrors({ capxError: "You must agree to the terms." });
    if (!amount || isNaN(amount) || Number(amount) < 100 || Number(amount) % 1 !== 0) {
      return setFormErrors({ capxError: "Enter a valid amount (minimum 100, no decimals)." });
    }
    if (!depositCoin) return setFormErrors({ capxError: "Select a valid deposit coin." });
    var finalCoin = "";
    if (depositCoin === "ETH") {
      finalCoin = "ETH";
    } else if (depositCoin === "USDT (TRC-20)") {
      finalCoin = "USDT.TRON";
    } else if (depositCoin === "USDT (ERC-20)") {
      finalCoin = "USDT.ETH";
    } else if (depositCoin === "USDT (BEP-20)") {
      finalCoin = "USDT.BSC";
    }

    try {
      const data = {
        orderAmount: amount,
        paymentCurrency: finalCoin,
        paymentChain,
      };

      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);

      if (!encryptedData || !id || !reqdata || isNaN(id)) {
        setButtonLoading(false);
        throw new Error("Invalid request data. Try again.");
      }

      const finalData = { data: encryptedData, reqid: id, reqdata };

      if (depositMethod === "nowpayment") {
        const result = await dispatch(nowPaymentsDepositThunk(finalData)).unwrap();
        if (result.checkout_url) {
          setButtonLoading(false);
          window.location.href = result.checkout_url;
        } else {
          setButtonLoading(false);
          setFormErrors({ capxError: "Failed to get payment URL. Please try again." });
        }
      } else {
        // Manual deposit logic
        const manualPayment = await dispatch(dispatchManualThunk(finalData));
        if (manualPayment.type === dispatchManualThunk.fulfilled.type && manualPayment.payload?.status === "ok") {
          //set order id for manual deposit
          setManualOrderId(manualPayment.payload.transaction_id);
          setOrderAmount(manualPayment.payload.amount);
          setOrderCurrency(manualPayment.payload.currency);
          setOrderDepositAddress(manualPayment.payload.address);
          setShowManualDeposit(true);
        }

        setButtonLoading(false);

      }
    } catch (err) {
      setButtonLoading(false);
      const msg = err instanceof Error ? err.message : "Payment error!! Please try again later.";
      dispatch(setTxError(msg));
      failedOrder({ order_id: txnOrderId, type: depositMethod });
      setFormErrors({ capxError: msg });
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold ml-8 mb-4">Deposit Funds</h2>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-10 rounded-3xl">
        {formErrors.capxError && (
          <div className="mb-2 w-full text-red-700 bg-red-100 p-3 rounded animate-fade-in">
            {formErrors.capxError}
          </div>
        )}
        <div className="border-gray-100 p-8 rounded-2xl shadow-md max-w-md w-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Select Currency</label>
              <select
                value={depositCoin}
                onChange={(e) => setDepositCoin(e.target.value)}
                className="w-full px-4 py-2 rounded border"
              >
                {paymentConfigs.nowpayment.coins.map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label>Enter Deposit Amount (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded border"
                placeholder="Enter deposit amount."
                min="100"
                step="0"
              />
            </div>

            {/* <div>
              <label>Payment Chain</label>
              <input
                type="text"
                value={paymentChain}
                disabled
                className="w-full px-4 py-2 rounded border bg-gray-100"
              />
            </div> */}

            <div>
              <label className="flex items-center">Select Deposit Method</label>
              <div className="flex items-center space-x-4">
                <select
                  className="w-full px-4 py-2 rounded border"
                  value={depositMethod}
                  onChange={e => setDepositMethod(e.target.value)}
                >
                  <option value="nowpayment">ePayment</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2 w-10 h-10 accent-[#7A44FF]"
              />
              <label>
                I understand that sending crypto to an incorrect address or using the wrong chain may result in the permanent loss of funds.
              </label>
            </div>

            <button
              type="submit"
              disabled={!amount || !agree || btnloading}
              className="w-full py-3 bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold text-white rounded disabled:opacity-50"
            >
              {btnloading ? "Processing... Deposit" : "Deposit"}
            </button>
          </form>
        </div>
      </div>

      {showmanualdeposit && (
        <ManualDeposit
          onClose={() => setShowManualDeposit(false)}
          orderId={orderId}
          orderAmount={orderAmount}
          orderCurrency={depositCoin}
          orderDepositAddress={orderDepositAddress}
        />
      )}
    </Layout>
  );
};

export default DepositFunds;