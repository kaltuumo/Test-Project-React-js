import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ sax
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";

const Login = () => {
  const { login } = useAuth(); // ← sax
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(email, password); // sug login-ka dhamaado
    navigate("/dashboard");
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};


  return (
    <div className="flex min-h-screen bg-gray-100 w-full justify-center items-center p-6">
  <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
          <Label text="Email" /> Email

          <InputField
           type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           />
          </div>

          <div>
         <Label text="Password" /> Password
<InputField
  type="password"          // ✔ sax
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          </div>
          <Button type="submit">Login</Button>

        </form>
      </div>
    </div>
  );
};

export default Login;
