"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", user);
      console.log("🚀 ~ Log -> file: page.tsx:32 -> onLogin -> data:", data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("🚀 ~ Log -> file: page.tsx:27 -> onLogin -> error:", error);
      toast.error("Signup Failed, error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading" : "Login"}</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter email"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
      />
      <button
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow"
      >
        Login
      </button>
      <Link href="/signup">Goto Sign Up Page</Link>
    </div>
  );
}
