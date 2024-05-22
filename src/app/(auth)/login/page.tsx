"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {
    console.log("🚀 ~ Log -> file: page.tsx:17 -> onSignUp -> user:", user);
  };

  return (
    <div>
      <h1>Login</h1>
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
        onClick={onSignUp}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow"
      >
        Sign Up
      </button>
      <Link href="/signup">Goto Sign Up Page</Link>
    </div>
  );
}
