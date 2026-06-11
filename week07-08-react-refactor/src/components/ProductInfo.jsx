export default function ProductInfo() {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="text-xs font-bold text-red-500 border border-red-500 px-1">NEW</span>
        <span className="text-xs text-gray-500 border border-gray-400 px-1">まとめ買い</span>
      </div>
      <h3 className="text-base font-bold text-left font-sans ">NEW CLASSIC NO.02</h3>
      <div className="flex gap-4 text-sm text-gray-500 ">
        <p>UTF-25A-255</p>
        <p>クラシック</p>
      </div>
    </div>
  );
}
