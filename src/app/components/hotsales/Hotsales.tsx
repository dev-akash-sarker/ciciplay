"use client";
import Image from "next/image";
import { FC } from "react";

import SaleForm from "./Saleform";

const Hotsales: FC = () => {
  type hotsaletype = {
    image: string;
    title: string;
  };

  const hotsales: hotsaletype[] = [
    {
      image: "/hotsale/a.png",
      title: "FFXIV Gil",
    },
    {
      image: "/hotsale/b.png",
      title: "Diablo 4 Gold",
    },
    {
      image: "/hotsale/c.png",
      title: "WoW SoD Gold US",
    },
    {
      image: "/hotsale/d.png",
      title: "FC 25 Coins",
    },
    {
      image: "/hotsale/e.png",
      title: "Archeage Gold",
    },
    {
      image: "/hotsale/f.png",
      title: "Dungeonborne Gold",
    },
  ];

  return (
    <div className="w-[1250px] mx-auto">
      <div className="flex gap-10">
        <div className="bg-[rgba(22,31,51,70)] rounded-[20px] -mt-10 z-40">
          <h3 className="flex items-center gap-3 text-white font-bold text-xl mb-3 mt-6 ml-6">
            <Image
              src="/hotsale/hot.png"
              width={24}
              height={24}
              alt="hot sale"
            />
            <span className="inline">Hot Sale</span>
          </h3>

          <div className="flex hotsalehover w-[322px] mb-6 mx-6 flex-wrap gap-3">
            {hotsales.map((item) => (
              <div
                key={item.title} // Using title as key to avoid unnecessary uuid generation
                className="w-[155px] h-[60px] bg-gradient-to-l from-purple-500 via-indigo-200 to-purple-100 relative rounded-[10px]"
              >
                <div className="w-[147px] h-[52.9px] bg-[#161F33] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-[4.5px] outline-[#334155] hover:outline-transparent rounded-md flex items-center gap-3 p-2">
                  <Image
                    src={item.image}
                    width={44}
                    height={44}
                    alt={item.title}
                    className="rounded-[10px]"
                  />
                  <h6 className="text-[#D6E0EB] text-base font-normal">
                    {item.title}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[rgba(22,31,51,70)] rounded-[20px] -mt-10 z-40">
          <div className="p-6">
            <SaleForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotsales;
