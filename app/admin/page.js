"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function login() {
    await supabase.auth.signInWithPassword({ email, password });
    alert("logged in");
  }

  async function addProduct() {
    await supabase.from("products").insert({
      name,
      price
    });
  }

  return (
    <div className="p-6 bg-black text-pink-300 min-h-screen">
      <h1>ADMIN</h1>

      <h2>LOGIN</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>LOGIN</button>

      <h2>ADD PRODUCT</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setPrice(e.target.value)} />
      <button onClick={addProduct}>ADD</button>
    </div>
  );
}
