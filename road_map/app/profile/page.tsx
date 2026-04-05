//./app/profile/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { update } = useSession();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    school: "",
    district: "",
    classStudying: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    
    const res = await fetch("/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      await update();
      window.location.href = "/learn";
    } else {
      alert("Failed to save profile");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          />

          <input
            name="dob"
            type="date"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          />

          <input
            name="school"
            placeholder="School Name"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          />

          <input
            name="district"
            placeholder="District"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          />

          <select
            name="classStudying"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          >
            <option value="">Select Class</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="dropper">Dropper</option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-500 text-black py-2 rounded mt-3"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}