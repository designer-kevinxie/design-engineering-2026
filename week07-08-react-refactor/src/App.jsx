import { useState } from "react";
import "./App.css";
//components
import ProductInfo from "./components/ProductInfo";
import ImageViewer from "./components/ImageViewer";
import ColorSelector from "./components/ColorSelector";
import LensSelector from "./components/LensSelector";

//imgs
import brownImg from "./assets/jins-glasses-brown.webp";
import blackImg from "./assets/jins-glasses-black.webp";

//datas
const framesDatabase = [
  { id: "brown", name: "ブラウン", cssColor: "#5e3b33", img: brownImg },
  { id: "black", name: "ブラック", cssColor: "#3e2b26", img: blackImg },
];
const lensesDatabase = [
  { id: "clear", name: "通常クリアレンズ", price: 0 },
  { id: "screen", name: "JINS SCREEN", price: 5500 },
  { id: "thin", name: "極薄レンズ", price: 11000 },
];

function App() {
  //frame
  const [selectedColor, setSelectedColor] = useState("brown");
  const currentFrameData = framesDatabase.find(
    (item) => item.id === selectedColor,
  );
  //lenses
  const [selectedLens, setSelectedLens] = useState("clear");
  const currentLensData = lensesDatabase.find(
    (lens) => lens.id === selectedLens,
  );
  //price
  const basePrice = 9900;
  const totalPrice = basePrice + currentLensData.price;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
        <ProductInfo />
        {/* frameImage = {currentFrameData.img} 类似html属性和属性值（为js变量的属性值） */}
        <ImageViewer frameImage={currentFrameData.img} />
        <ColorSelector
          framesDatabase={framesDatabase}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
        <LensSelector
          lensesDatabase={lensesDatabase}
          selectedLens={selectedLens}
          onLensChange={setSelectedLens}
        />
        {/* <PriceSummary totalPrice={totalPrice} /> */}
      </div>
    </div>
  );
}

export default App;
