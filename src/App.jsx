import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import Dashboard from "./pages/Dashboard";
import AdminProfile from "./pages/AdminProfile";
import PrivateRoute from "./utils/PrivateRoute";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <MainLayout><Dashboard /></MainLayout>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <MainLayout><AdminProfile /></MainLayout>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/register" 
        element={
          <PrivateRoute>
            <MainLayout><RegisterAdmin /></MainLayout>
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default App;
