import Image from "next/image";
import { FC, useState, FormEvent, JSX } from "react";
import SelectGame from "../selectgame/SelectGame";
import SelectServer from "../selectserver/SelectServer";
import { LuCircleCheck } from "react-icons/lu";
import Quantity from "../quantity/Quantity";
import { IoLogoEuro } from "react-icons/io";

interface FormData {
  game: string;
  item: string;
  server: string;
  price: string;
}

interface Server {
  serverName: string;
  extraserver: {
    middleServer: string[];
    servers: { servername: string }[];
  };
}

interface GameOption {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface Package {
  title: string;
  img: string;
}

const SaleForm: FC = () => {
  const [price, setPrice] = useState<string>("1000");
  const [formData, setFormData] = useState<FormData>({
    game: "",
    item: "",
    server: "",
    price: "",
  });

  const servers: Server[] = [
    {
      serverName: "NA",
      extraserver: {
        middleServer: ["ALL", "Aether", "Crystal", "Primal"],
        servers: [
          { servername: "Adamantoise" },
          { servername: "Cactuar" },
          { servername: "Faerie" },
          { servername: "Gilgamesh" },
          { servername: "Jenova" },
        ],
      },
    },
    {
      serverName: "JP",
      extraserver: {
        middleServer: ["ALL", "Aether", "Crystal", "Primal"],
        servers: [
          { servername: "Adamantoise" },
          { servername: "Cactuar" },
          { servername: "Faerie" },
          { servername: "Gilgamesh" },
          { servername: "Jenova" },
        ],
      },
    },
    {
      serverName: "OCE",
      extraserver: {
        middleServer: ["ALL", "Aether", "Crystal", "Primal"],
        servers: [
          { servername: "Adamantoise" },
          { servername: "Cactuar" },
          { servername: "Faerie" },
          { servername: "Gilgamesh" },
          { servername: "Jenova" },
        ],
      },
    },
  ];

  const games: GameOption[] = [
    "Volvo",
    "Saab",
    "Mercedes",
    "Audi",
    "Volvo",
    "Saab",
    "Mercedes",
    "Audi",
  ].map((label) => ({
    value: label.toLowerCase(),
    label,
    icon: <Image src="/hotsale/a.png" width={24} height={24} alt={label} />,
  }));

  const packages: Package[] = [
    { title: "Gold", img: "/hotsale/a.png" },
    { title: "Wow", img: "/hotsale/b.png" },
    { title: "NBA", img: "/hotsale/c.png" },
    { title: "WOW", img: "/hotsale/d.png" },
  ];

  const handleSelectServer = (
    region: string,
    middleServer?: string,
    server?: string
  ) => {
    const serverDisplay = [region, middleServer, server]
      .filter(Boolean)
      .join(" / ");
    setFormData((prev) => ({ ...prev, server: serverDisplay }));
  };

  const handleGameSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, game: value }));
  };

  const handlePriceSelect = (value: string) => {
    setPrice(value);
    setFormData((prev) => ({ ...prev, price: value }));
  };

  const handlePackageSelect = (title: string) => {
    setFormData((prev) => ({ ...prev, item: title }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final Form Data:", JSON.stringify(formData));
    // Handle submission (API call etc.)
  };
  // base price
  const baseprice: number = 0.02368;

  const packageprice = [
    {
      priceitem: "500",
    },
    {
      priceitem: "1000",
      extra: "20",
    },
    {
      priceitem: "2000",
    },
    {
      priceitem: "3000",
      extra: "5",
    },
    {
      priceitem: "4000",
    },
  ];

  const totalprice: number = Number(price) * baseprice;

  const [integerPart, decimalPart] = totalprice.toFixed(2).split(".");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className=" flex gap-3">
        <div className=" space-y-6 w-[400px]">
          {/* Game Selection */}
          <SelectGame
            games={games}
            onSelect={handleGameSelect}
            placeholder="Select a game"
          />

          {/* Package Selection */}
          <div className="flex flex-wrap gap-3">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="w-[89.75px] h-[40px] bg-gradient-to-l from-purple-500 via-indigo-200 to-purple-100 rounded-[10px] relative"
              >
                <button
                  type="button"
                  className={`w-[81.75px] h-[32px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex items-center gap-3 p-2 ${
                    formData.item === pkg.title
                      ? "bg-[#161F33] outline-none"
                      : "bg-[#161F33] outline-[4.5px] outline-[#334155] hover:outline-transparent"
                  }`}
                  onClick={() => handlePackageSelect(pkg.title)}
                >
                  <Image
                    src={pkg.img}
                    width={18}
                    height={18}
                    alt={pkg.title}
                    className="rounded-full"
                  />
                  <h6 className="text-[#D6E0EB] text-base">{pkg.title}</h6>
                </button>
              </div>
            ))}
          </div>

          {/* Server Selection */}
          <SelectServer
            servers={servers}
            onSelect={handleSelectServer}
            placeholder="Choose a server"
          />
          <div className=" text-[#D6E0EB] flex justify-start items-center gap-2">
            <LuCircleCheck fontSize={16} />
            <p>Prices may vary from server to server</p>
          </div>
        </div>
        <div className=" w-[400px] ml-6">
          <Quantity prices={packageprice} onSelect={handlePriceSelect} />
          <div className=" flex items-center gap-6">
            <div className=" flex items-baseline">
              <IoLogoEuro fontSize={35} color="white" />
              <span className=" font-bold text-[48px] text-light-red">
                {integerPart}.
              </span>
              <span className=" font-bold text-xl text-light-red">
                {decimalPart}
              </span>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className=" w-full px-6 py-2 bg-buttonpink text-white rounded"
            >
              Buy
            </button>
          </div>
          <div className=" text-[#D6E0EB] flex justify-start items-center gap-2">
            <LuCircleCheck fontSize={16} />
            <p>Expected delivery time: 10mins -24 hrs</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
