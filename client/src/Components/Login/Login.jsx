import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hdlLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:1000/api/login", {
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

      //เก็บ token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Success");
      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col w-150 bg-gray-100 items-center p-6 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold mt-6 mb-10 text-gray-900">Login</h1>

        <form className="flex flex-col w-full" onSubmit={hdlLogin}>
          <label htmlFor="name" className="text-lg font-semibold">
            User Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
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
            Login
          </button>

          <Link
            to="/register"
            className="rounded-xl p-3 bg-gray-200 mt-3 text-center font-bold"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
