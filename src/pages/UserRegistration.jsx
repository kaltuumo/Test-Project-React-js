import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ sax
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";
const UserRegistration = () => {
  const { register, login  } = useAuth(); // ← sax
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const handleRegsiter = async (e) => {
    e.preventDefault();
    try {
      const res = await register(fullname, phone, email, password);

      if (res.message) {
        await login(email, password);
        navigate("/dashboard");
      } else if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("User registration failed");
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100 w-full justify-center items-center p-6">
  <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Registration Form
        </h2>

        <form onSubmit={handleRegsiter} className="space-y-5">
          <div>
  <Label text="Fullname" /> FullName
  <InputField
    type="text"
    placeholder="Enter fullname"
    value={fullname}
    onChange={(e) => setFullname(e.target.value)}
  />
</div>

<div>
  <Label text="Phone" /> Phone
  <InputField
    type="tel"
    placeholder="Enter phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>

<div>
  <Label text="Email" /> Email
  <InputField
    type="email"
    placeholder="Enter email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

<div>
  <Label text="Password" /> Password
  <InputField
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>

          <Button type="submit">Register User</Button>

        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
