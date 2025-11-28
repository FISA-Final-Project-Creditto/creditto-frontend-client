"use client";

export default function InfoDisplayField({ label, value }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-black block">{label}</label>
      <div className="text-lg text-black font-medium">{value}</div>
    </div>
  );
}
