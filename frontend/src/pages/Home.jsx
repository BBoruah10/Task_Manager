import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen text-white flex flex-col overflow-hidden">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900"></div>

      {/* Floating Glow Effects */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-3xl"
      />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-12 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
          <h1 className="text-3xl font-extrabold tracking-wide">
            TaskManager
          </h1>

          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 rounded-lg bg-white text-indigo-700 font-bold hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-1 items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Organize Work.
              <br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Deliver Results.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-blue-100/80 mb-10 font-medium">
              A secure and scalable full-stack task management platform
              designed to improve collaboration and productivity across teams.
            </p>

            <div className="space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  to="/register"
                  className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-2xl"
                >
                  Get Started
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  to="/login"
                  className="px-10 py-4 border border-white/30 rounded-xl hover:bg-white/10 transition font-semibold"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-blue-200/60 text-sm border-t border-white/10 backdrop-blur-md bg-white/5">
          © {new Date().getFullYear()} TaskManager. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Home;