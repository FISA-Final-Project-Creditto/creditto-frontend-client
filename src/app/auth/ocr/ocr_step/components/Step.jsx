export default function Step({ title, subtitle }) {
  return (
    <div className="flex items-center gap-[0.9375rem] mb-[35px]">
      <div className="w-10 h-10 rounded-full bg-[#E5E6EB]" />
      <div>
        <p className="font-semibold text-[1.125rem] text-[#000000]">{title}</p>
        <p className="font-light text-[0.875rem] text-[#4E5969]">{subtitle} </p>
      </div>
    </div>
  );
}
