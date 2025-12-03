import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";
import UserRegistration from "./pages/UserRegistration";
import UserList from  "./pages/user/UserList";
import UpdateUser from "./pages/user/updateUser";
import ZoneList from "./pages/zone/ZoneList";
import UpdateZone from "./pages/zone/UpdateZone";
import CustomerList from "./pages/customer/CustomerList";
import UpdateCustomer from "./pages/customer/updateCustomer";
import AreaList from "./pages/area/AreaList";
import UpdateArea from "./pages/area/updateArea";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-register" element={<UserRegistration />} />
          <Route path="/user-list" element={<UserList/>} />
          <Route path="/user-update" element={<UpdateUser/>} />
          <Route path="/zone-list" element={<ZoneList/>} />
          <Route path="/zone-update" element={<UpdateZone/>} />
          <Route path="/customer-list" element={<CustomerList/>} />
          <Route path="/customer-update" element={<UpdateCustomer/>} />
          <Route path="/area-list" element={<AreaList/>} />
          <Route path="/area-update" element={<UpdateArea/>} />



          

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
