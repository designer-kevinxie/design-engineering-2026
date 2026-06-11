export default function ColorSelector({
  framesDatabase,
  selectedColor,
  onColorChange,
}) {
  const currentFrameData = framesDatabase.find(
    (item) => item.id === selectedColor,
  );

  return (
    <div className="flex flex-col gap-3">
      {/* buttons to choose color */}
      <ul className="flex gap-3">
        {framesDatabase.map((frame) => (
          <li key={frame.id}>
            <button
              onClick={() => onColorChange(frame.id)}
              style={{
                backgroundColor: frame.cssColor,
                borderColor:
                  selectedColor === frame.id ? frame.cssColor : "transparent",
              }}
              className="cursor-pointer w-7 h-7 rounded-full bg-clip-content p-1 border-1 transition-all"
            />
          </li>
        ))}
      </ul>
      {/* text display */}
      <div className="leading-none text-sm text-left">
        <span className="text-gray-500">フレームのカラー：</span>
        <span className="font-bold ml-1">{currentFrameData.name}</span>
      </div>
    </div>
  );
}
