import lensImg from "../assets/clear-lens.png";

export default function LensSelector({
  lensesDatabase,
  selectedLens,
  onLensChange,
}) {
  const currentLensData = lensesDatabase.find(
    (item) => item.id === selectedLens,
  );

  return (
    <div className="flex flex-col gap-3">
        {/* lenses cards */}
        <div className="flex gap-6">
            {lensesDatabase.map((lens) =>(
                // `...`（反引号）： 这是 JS 里的“高级字符串”（模板字符串）。它允许你在一段文本里，再嵌入其他的 JS 变量
                <div key={lens.id} onClick={() =>onLensChange(lens.id)} className={`flex flex-col items-center px-2 py-2.5 border  cursor-pointer ${selectedLens === lens.id ? `border-gray-700` : `border-gray-200`}`} >
                    <img src={lensImg} alt="image of lens" className="max-w-11" />
                    <span className="text-sm min-w-24 ">{lens.name}</span>
                    <div><span>+</span><span>¥{lens.price}</span></div>
                
                </div>
                
            ))}
        </div>
        {/* lenses text display */}
        <div className="leading-none text-sm text-left">
        <span className="text-gray-500">フレームのカラー：</span>
        <span className="font-bold ml-1">{currentLensData.name}</span>
      </div>
    </div>
  )
}
