import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

    {/* Background Gradient (Same as Home) */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900"></div>

    {/* Soft Glow */}
    <div className="absolute top-[-150px] right-[-150px] w-[450px] h-[450px] bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-[-150px] left-[-150px] w-[450px] h-[450px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>

    {/* Animated Card */}
    <div className="relative z-10 w-full max-w-md animate-fadeIn">

      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 
                      p-10 rounded-3xl shadow-2xl border border-white/40">

        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-slate-600 mb-8 font-medium">
          Sign in to access your dashboard
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 bg-white border border-slate-300 rounded-xl 
                       text-slate-800 font-medium
                       focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 outline-none transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 bg-white border border-slate-300 rounded-xl 
                       text-slate-800 font-medium
                       focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 outline-none transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <div className="pt-2">
            <Button loading={loading}>Login</Button>
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-slate-600 font-medium">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;