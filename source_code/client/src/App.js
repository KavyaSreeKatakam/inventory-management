import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Addition from './Addition';
import APIInfo from './APIInfo';
import Introduction from './Introduction';
import Inventory from './Inventory';
import HomePage from './HomePage';
import SignupPage from "./SignupPage";
import UserProfile from "./UserProfile";
function App() {
  return (
    <div className="App">

  <HashRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignupPage />} />
      <Route path="/Introduction" element={<Introduction />} />
      <Route path="/addition" element={<Addition />} />
      <Route path="/3rdPartyAPI" element={<APIInfo />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      
    </Routes>
  </HashRouter>
     
    </div>
  );
}

export default App;
