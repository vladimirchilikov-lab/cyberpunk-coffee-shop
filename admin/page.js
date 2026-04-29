"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  async function addProduct() {
    let image_url = "";

    if (file) {
      const fileName = Date.now() + "-" + file.name;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        alert("Upload error");
        return;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      image_url = data.publicUrl;
    }

    await supabase.from("products").insert({
      name,
      price,
      description: desc,
      image_url
    });

    alert("Product added");
  }

  return (
    <div className="p-6 bg-black text-pink-300 min-h-screen">
      <h1>ADMIN CMS</h1>

      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="desc" onChange={(e) => setDesc(e.target.value)} />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={addProduct} className="bg-cyan-600 px-3 py-1 mt-3">
        ADD PRODUCT
      </button>
    </div>
  );
}
