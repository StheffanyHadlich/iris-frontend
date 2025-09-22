"use client";

import { useForm } from "react-hook-form";
import { loginAction } from "@/auth/actions/auth-actions";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    const res = await loginAction(data.email, data.password);
    if (res.success) {
      router.push("/dashboard");
    } else {
      alert(res.message || "login failed.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <img
          src="/iris-icon.jpg"
          alt="Logo"
          className="w-20 h-20 rounded-full shadow-md"
        />
      </div>

      <h1 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white shadow-md hover:bg-orange-700 hover:shadow-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        </p>
        <a
          href="register"
          className="text-orange-600 font-medium hover:underline">
          Sign up
        </a>
    </div>
  );
}
