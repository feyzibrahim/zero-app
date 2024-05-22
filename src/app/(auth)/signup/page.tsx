"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {
    console.log("🚀 ~ Log -> file: page.tsx:17 -> onSignUp -> user:", user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>SignUp</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter username"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
      />
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

      <Link href="/login">Goto Login Page</Link>
    </div>
  );
}
