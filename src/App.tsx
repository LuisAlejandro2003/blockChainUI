import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import AddCreditAgreementPage from "./components/pages/AddCreditAgreementPage";
import RecoveryPage from "./components/pages/RecoveryPage";
import AccountCreationPage from "./components/pages/AccountCreationPage";
import RegisterPage from "./components/pages/RegisterPage";
import Endose from "./components/pages/Endose";
import InformationOne from "./components/pages/InformationOne";
import InformationTwo from "./components/pages/InformationTwo";
import RecoveryExplanation from "./components/pages/RecoveryExplanation";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-credit-agreement" element={<AddCreditAgreementPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/firstStep" element={<AccountCreationPage />} />
        <Route path="/secondStep" element={<RegisterPage />} />
        <Route path="/endose" element={<Endose />} />
        <Route path="/informationOne" element={<InformationOne />} />
        <Route path="/informationTwo" element={<InformationTwo />} />
        <Route path="/recoveryExplanation" element={<RecoveryExplanation />} />
      </Routes>
    </Router>
  );
};

export default App;
