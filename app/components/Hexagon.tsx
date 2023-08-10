import React from "react";
import Image from "next/image";

interface HexagonProps {
  content?: string;
  size?: number;
  onClick?: any;
}

const Hexagon = ({ content = "", size = 150, onClick }: HexagonProps) => {
  return (
    <div onClick={onClick} className={`relative cursor-pointer hover:scale-105 transition duration-100 ease-in `}>
      <Image src="/img/polygon.png" alt={content} width={size} height={size} />
      <p className={`absolute inset-0 flex items-center justify-center  uppercase  lg:text-[1vw]  select-none`}>
        {content}
      </p>
    </div>
  );
};

export default Hexagon;
