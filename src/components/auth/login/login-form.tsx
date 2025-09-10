"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("Usuário logado:", res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <img
          src="/iris-icon.jpg"
          alt="Logo"
          className="w-50 h-50 rounded-full shadow-md"
        />
      </div>

      <h1 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white shadow-md hover:bg-orange-700 hover:shadow-lg transition"
        >
          Log In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="register"
          className="text-orange-600 font-medium hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
