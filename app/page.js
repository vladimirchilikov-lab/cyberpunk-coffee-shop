
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

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
          <div key={p.id} className="border border-cyan-500 p-4">
            {p.image_url && (
              <img
                src={p.image_url}
                className="w-full h-40 object-cover mb-2"
              />
            )}

            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-pink-400">${p.price}</p>

            <button
              className="mt-2 bg-pink-600 px-3 py-1"
              onClick={() => router.push(`/product/${p.id}`)}
            >
              VIEW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
