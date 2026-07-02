import { useState } from "react";
import { useAuth } from "../zustand/useAuth.js";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquareHeart,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* login container */}
        <div className="w-full max-w-md space-y-8">
          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-5 rounded-3xl border border-white/15 bg-black/30 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* logo */}
            <div className="text-center space-y-2">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] shadow-lg shadow-pink-500/30 ring-1 ring-white/20">
                <MessageSquareHeart className="size-6 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-sm text-white/60">
                Your people are just one login away.
              </p>
            </div>

            {/* email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/35 outline-none transition focus:border-[#E1306C] focus:bg-white/15 focus:ring-2 focus:ring-pink-400/30"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-12 text-white placeholder:text-white/35 outline-none transition focus:border-[#E1306C] focus:bg-white/15 focus:ring-2 focus:ring-pink-400/30"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <EyeOff className="size-5" />
                  : <Eye className="size-5" />}
                </button>
              </div>
            </div>
            {/* create account button */}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoggingIn}
            >
              {isLoggingIn ?
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              : "Sign in"}
            </button>
            {/* link */}
            <div className="text-center">
              <p className="text-sm text-white/60">
                Don&apos;t have an account?
                <Link
                  to="/signup"
                  className="font-semibold text-white underline underline-offset-4 transition hover:text-pink-200 p-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
