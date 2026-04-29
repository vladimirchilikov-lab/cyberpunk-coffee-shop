
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function Product({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      setProduct(data);
    }
    load();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-black text-cyan-300 min-h-screen">
      {product.image_url && (
        <img src={product.image_url} className="w-full max-w-md mb-4" />
      )}

      <h1 className="text-3xl">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-pink-400 text-xl">${product.price}</p>
    </div>
  );
}
