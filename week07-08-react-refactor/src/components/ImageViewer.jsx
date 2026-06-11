
import { useState } from "react";

//{frameImage}对象解构，在参数列表里执行“拆箱”动作
export default function ImageViewer({frameImage}) {

    const [isFavorite,setIsFavorite] = useState(false);

  return (
    <div className="relative bg-gray-100 rounded-lg p-6 mb-6">
      <img
        src={frameImage}
        alt="JINS Glasses"
        className="w-full h-auto object-contain mix-blend-multiply"
      />
      <button onClick={()=>setIsFavorite(!isFavorite)} className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm  transition-colors cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
}
