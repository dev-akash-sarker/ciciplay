import Image from "next/image";
import { FC, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface Prices {
  priceitem: string;
  extra?: string;
}
interface CustomSelectProps {
  prices: Prices[];
  onSelect: (value: string) => void;
}
const Quantity: FC<CustomSelectProps> = ({ prices, onSelect }) => {
  const [price, setPrice] = useState<string>("1000");

  type PriceType = {
    priceitem: string;
  };
  const handlePrice = (price: PriceType) => {
    onSelect(price.priceitem);
    setPrice(price.priceitem);
  };
  return (
    <>
      <div className="">
        <div className=" flex justify-between items-center gap-6">
          <span className=" text-light-gray text-xl"> Quantity(G):</span>
          <div className=" flex justify-between items-center w-[231px] py-[14.5px] px-4 bg-primary rounded-[10px] border border-light-black">
            <button>
              <FaMinus fontSize={16} className=" text-light-gray" />
            </button>
            <span className=" text-xl text-light-gray">{price}</span>
            <button>
              <FaPlus fontSize={16} className=" text-light-gray" />
            </button>
          </div>
        </div>
        {/* Package Selection */}
        <div className="flex flex-wrap justify-between gap-3 my-6">
          {prices.map((pkg, idx) => (
            <>
              <div
                key={idx}
                className="p-[3px] bg-gradient-to-l from-purple-500 via-indigo-200 to-purple-100 rounded-[10px] relative"
              >
                <button
                  type="button"
                  className={`w-full h-full rounded-md flex items-center gap-3 p-2 ${
                    price === pkg.priceitem
                      ? "bg-[#161F33] outline-none"
                      : "bg-[#161F33] outline-[3.5px] outline-[#334155] hover:outline-transparent"
                  }`}
                  onClick={() => handlePrice(pkg)}
                >
                  <h6 className="text-[#D6E0EB] text-base relative">
                    {pkg.priceitem}
                    {pkg.extra && (
                      <div className=" absolute -top-7 left-4 z-20 bg-light-red p-[4px] rounded-[6px]">
                        <div className="flex justify-center items-center w-[50px] h-[18px] gap-2 ">
                          <Image
                            src="./price/Gift.svg"
                            width={10}
                            height={10}
                            alt="gift"
                          />
                          <div className=" font-bold text-[12px]">
                            {"+" + pkg.extra + "%"}
                          </div>
                        </div>
                      </div>
                    )}
                  </h6>
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quantity;
