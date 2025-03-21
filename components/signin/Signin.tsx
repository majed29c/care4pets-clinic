import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
const Signin = () => {
  return (
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 w-[50vw] mt-[4vw]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-800">Sign in to manage your pet's care</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-700"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-700 px-3">
              <input
                type="checkbox"
                className="rounded bg-white/10 border-white/20 focus:ring-blue-400"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-shadow transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-700">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
              <FaGoogle className="text-red-400" />
              <span className="text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all">
              <FaGithub className="text-gray-800" />
              <span className="text-gray-700">GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
  );
};

export default Signin;