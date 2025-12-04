export default function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start text-sm">
      <span className="text-[#86909C] font-semibold whitespace-nowrap">
        {label}
      </span>
      <span className="text-black font-semibold text-right">{value}</span>
    </div>
  );
}
