import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import BuyTableRow from "../../components/buycapx/BuyTableRow";
import StakeTableRow from "../../components/buycapx/StakeTableRow";
import BuyCapXDetails from "../../components/buycapx/BuyCapXDetails";
import { getTokenPlanThunk, clearTransactionState } from "../../store/slices/transactionSlice";


const BuyCapX = () => {
  const dispatch = useDispatch();
  const { tokenPlans = [], loading, error } = useSelector((state) => state.transaction);
  const [activeTab, setActiveTab] = useState("buy");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(clearTransactionState());
    if (activeTab === 'buy') {
      dispatch(getTokenPlanThunk());
    }
  }, [dispatch, activeTab]);

  const tabs = [
    {
      key: "buy",
      label: "Buy Crypto",
      headers: [
        "Investment",
        "Price",
        "TGE Unlock",
        "Lock Period",
        "Vesting",
        "Action",
      ],
      RowComponent: BuyTableRow,
    },
    {
      key: "stake",
      label: "Stake Crypto",
      headers: [
        "Token",
        "Available Balance",
        "APY / Reward Rate",
        "Lock Period",
        "Action",
      ],
      data: [
        {
          tokenName: "CAPShield",
          symbol: "CAPX",
          availableBalance: "10,500 CAPX",
          apy: "12% APY",
          lockPeriod: "12 months",
          buttonText: "Stake CAPX",
        },
        {
          tokenName: "AngelSEED",
          symbol: "ANGEL",
          availableBalance: "87,000 ANGEL",
          apy: "15% APY",
          lockPeriod: "6 months",
          buttonText: "BUY CAPX",
        },
      ],
      RowComponent: StakeTableRow,
    },
  ];

  const currentTab = tabs.find((tab) => tab.key === activeTab);

  return (
    <Layout>
      <div className="md:p-6 p-2 my-6 w-full max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-4xl dark:text-white font-semibold mb-6">
          Buy / Stake Crypto
        </h1>

        {!showDetails ? (
          <div className="bg-[#F8F3FF] dark:bg-zinc-800 sm:p-4 px-2 py-4 rounded-2xl shadow-sm">
            {/* Tab buttons */}
            <div style={{ textAlign: "center" }} className="flex items-center justify-center dark:bg-zinc-900 bg-white p-1 rounded-2xl border-2 border-[#7A44FF] max-w-md mx-auto mb-6">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setShowDetails(false);
                  }}
                  className={`px-6 py-2 w-full rounded-xl md:text-lg text-sm font-medium transition-all flex justify-center items-center ${
                    activeTab === key
                      ? "bg-[#7A44FF] text-white shadow-md"
                      : "text-[#7A44FF]"
                  }`}
                >
                  <span className="w-full text-center">{label}</span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-t-xl max-w-[80vw] mx-auto">
              {error && (
                <p className="text-red-500 text-center p-4">
                  Error: {typeof error === "object" ? error.message || JSON.stringify(error) : error}
                </p>
              )}
              <table className="w-full text-sm text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="bg-[#D8BFFF] text-[#2E1065] rounded-t-xl shadow-md" style={{ textAlign: "center" }}>
                    {currentTab.headers.map((title, index) => (
                      <th
                        key={index}
                        className={`py-6 px-4 max-sm:whitespace-nowrap ${
                          index === 0
                            ? "rounded-tl-xl"
                            : index === currentTab.headers.length - 1
                            ? "rounded-tr-xl"
                            : ""
                        }`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={currentTab.headers.length} className="text-center py-12">Loading...</td>
                    </tr>
                  ) : activeTab === "stake" ? (
                    currentTab.data?.map((row, index) => (
                      <currentTab.RowComponent
                        key={index}
                        data={row}
                        onBuyClick={() => {
                          setSelectedPlan(row);
                          setShowDetails(true);
                        }}
                      />
                    ))
                  ) : (
                    tokenPlans?.map((row, index) => (
                      <currentTab.RowComponent
                        key={index}
                        data={row}
                        onBuyClick={() => {
                          setSelectedPlan(row);
                          setShowDetails(true);
                        }}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <BuyCapXDetails plan={selectedPlan} onBack={() => setShowDetails(false)} />
        )}
      </div>
    </Layout>
  );
};

export default BuyCapX;
