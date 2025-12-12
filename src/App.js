import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layout/MainLayout";   
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";
import UserRegistration from "./pages/UserRegistration";
import UserList from "./pages/user/UserList";
import UpdateUser from "./pages/user/updateUser";
import ZoneList from "./pages/zone/ZoneList";
import UpdateZone from "./pages/zone/UpdateZone";
import CustomerList from "./pages/customer/CustomerList";
import UpdateCustomer from "./pages/customer/updateCustomer";
import AreaList from "./pages/area/AreaList";
import UpdateArea from "./pages/area/updateArea";
import HouseRegister from "./pages/house/HouseRegister";
import HouseList from "./pages/house/HouseList";
import ElectricRegister from "./pages/electric/ElectricRegister";
import InvoiceRegister from "./pages/invoice/InvoiceRegister";
import InvoiceList from "./pages/invoice/InvoiceList";
import InvoicePayment from "./pages/invoice/InvoicePayment";
import ReceiptPaymentPage from "./pages/invoice/ReceiptPaymentPage";
import LacagQabasho from "./pages/invoice/LacagQabasho";
import Receipt from "./pages/invoice/Receipt";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* LOGIN: No sidebar */}
          <Route path="/" element={<Login />} />

          {/* ALL PAGES WITH SIDEBAR */}
          <Route element={<MainLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-register" element={<UserRegistration />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/user-update" element={<UpdateUser />} />
            <Route path="/zone-list" element={<ZoneList />} />
            <Route path="/zone-update" element={<UpdateZone />} />
            <Route path="/customer-list" element={<CustomerList />} />
            <Route path="/customer-update" element={<UpdateCustomer />} />
            <Route path="/area-list" element={<AreaList />} />
            <Route path="/area-update" element={<UpdateArea />} />
            <Route path="/house-regsiter" element={<HouseRegister />} />
            <Route path="/house-list" element={<HouseList />} />
            <Route path="/electric-register" element={<ElectricRegister />} />
            <Route path="/invoice-register" element={<InvoiceRegister />} />
            <Route path="/invoice-list" element={<InvoiceList />} />
            <Route path="/invoice-payment" element={<InvoicePayment />} />
            <Route path="/receipt-payment" element={<ReceiptPaymentPage />} />
            <Route path="/lacag-qabasho" element={<LacagQabasho />} />
            <Route path="/receipt" element={<Receipt />} />



          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
