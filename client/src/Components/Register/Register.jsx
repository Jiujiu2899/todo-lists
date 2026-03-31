import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hdlRegister = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data);
      }

      alert("Register Success");

      // ไปหน้า login
      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-green-300">
      <div className="flex flex-col w-150 bg-gray-100 items-center p-6 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold mt-6 mb-10 text-gray-900">
          Register
        </h1>

        <form className="flex flex-col w-full" onSubmit={hdlRegister}>
          <label htmlFor="name" className="text-lg font-semibold">
            User Name
          </label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl p-3 bg-gray-200 mt-2 focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="psw" className="text-lg font-semibold mt-4">
            Password
          </label>
          <input
            type="password"
            id="psw"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-xl p-3 bg-gray-200 mt-2 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="rounded-xl p-3 bg-gray-700 mt-6 text-white font-bold"
          >
            register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
