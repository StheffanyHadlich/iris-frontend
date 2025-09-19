"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";
import { registerAction } from "@/auth/actions/auth-actions";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerAction(data.username, data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error in registration:", err);
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
        Create Your Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white shadow-md hover:bg-orange-700 hover:shadow-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?
      </p>
        <a
          href="/auth/login"
          className="text-orange-600 font-medium hover:underline">
          Log in
        </a>
    </div>
  );
}
