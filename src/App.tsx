import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./routes/PrivateRoute";

// Public Pages
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";
import TwoFactorPage from "./pages/twofactor";
import TaskCompletePage from "./pages/task-complete";

// Protected Pages
import Dashboard from "./pages/dashboard";
import BuyCapX from "./pages/buycapx";
import DepositHistory from "./pages/deposit-history";
import TokenHistory from "./pages/token-purchase-history";
import Withdraw from "./pages/withdraw";
import Transfer from "./pages/transfer";
import Conversion from "./pages/conversion";
import ReferralReport from "./pages/referral-report";
import DepositFunds from "./pages/deposit-funds";
import SuccessDeposit from "./pages/deposit-funds/success";
import Settings from "./pages/settings";
import Support from "./pages/support";
import NotFoundPage from "./pages/not-found";
import TransactionReport from "./pages/transaction-report";
import EarningsReport from "./pages/earnings-report";
import StakeEarningReport from "./pages/stake-earning-report";
import TransferReport from "./pages/transfer-report";
import WithdrawalReport from "./pages/withdrawal-report";
import ConversionsReport from "./pages/conversions-report";
import DepositHistoryReport from "./pages/deposit-history-report";
import StakingReport from "./pages/staking-report";

import PaymentSuccess from "./pages/status/success";
import PaymentFailed from "./pages/status/failed";
import Balance from "./pages/balance";



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Auth Routes protected from authenticated users */}
            <Route element={<PrivateRoute isAuthRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/:refcode" element={<SignupPage />} />
              <Route path="/signup/:refcode" element={<SignupPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/two-factor" element={<TwoFactorPage />} />
              <Route path="/taskcomplete" element={<TaskCompletePage />} />
            </Route>

            {/* Private Routes - only accessible when authenticated */}
            <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/success" element={<PaymentSuccess />} />
              <Route path="/dashboard/failed" element={<PaymentFailed />} />
              <Route path="/buy-token" element={<BuyCapX />} />
              <Route path="/deposit-history" element={<DepositHistory />} />
              <Route path="/token-purchase-history" element={<TokenHistory />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/conversion" element={<Conversion />} />
              <Route path="/referral-report" element={<ReferralReport />} />
              <Route path="/transaction-report" element={<TransactionReport />} />
              <Route path="/earnings-report" element={<EarningsReport />} />
              <Route path="/stake-earning-report" element={<StakeEarningReport />} />
              <Route path="/transfer-report" element={<TransferReport />} />
              <Route path="/withdrawal-report" element={<WithdrawalReport />} />
              <Route path="/conversions-report" element={<ConversionsReport />} />
              <Route path="/deposit-history-report" element={<DepositHistoryReport />} />
              <Route path="/staking-report" element={<StakingReport />} />
              <Route path="/deposit-funds" element={<DepositFunds />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/deposit-success" element={<SuccessDeposit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
            </Route>

            {/* Catch-all route for 404 - must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
