"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-300 p-6 font-mono">
      <h1 className="text-3xl mb-6">CYBERPUNK COFFEE</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4">
            <img src={p.image_url} className="h-40 w-full object-cover" />
            <h2>{p.name}</h2>
            <p>${p.price}</p>

            <button onClick={() => addToCart(p)}>ADD</button>
            <button onClick={() => router.push(`/product/${p.id}`)}>
              VIEW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
