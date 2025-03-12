import Image from "next/image";
import { ChangeEvent, FC, JSX, useState, FormEvent } from "react";
import CustomSelect from "./CustomSelect";

const SaleForm: FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedServer, setSelectedSever] = useState<string>("");
  const [buttonValue, setButtonValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    game: "",
    item: "",
    server: "",
  });
  interface FormData {
    name: string;
    email: string;
    game: string;
    item: string;
    server: string;
  }

  // Example data following the type
  const serveres = [
    {
      serverName: "NA",
      extraserver: {
        middleServer: ["ALL", "Aether", "Crystal", "Primal"], // Array of middle servers (strings)
        servers: [
          // Array of server objects
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
        middleServer: ["ALL", "Aether", "Crystal", "Primal"], // Array of middle servers (strings)
        servers: [
          // Array of server objects
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
        middleServer: ["ALL", "Aether", "Crystal", "Primal"], // Array of middle servers (strings)
        servers: [
          // Array of server objects
          { servername: "Adamantoise" },
          { servername: "Cactuar" },
          { servername: "Faerie" },
          { servername: "Gilgamesh" },
          { servername: "Jenova" },
        ],
      },
    },
  ];

  console.log("hello", serveres);
  type packageType = {
    title: string;
    img: string;
  };

  const packages: packageType[] = [
    { title: "Gold", img: "/hotsale/a.png" },
    {
      title: "Wow",
      img: "/hotsale/b.png",
    },
    {
      title: "NBA",
      img: "/hotsale/c.png",
    },
    {
      title: "WOW",
      img: "/hotsale/d.png",
    },
  ];

  interface game {
    value: string;
    label: string;
    icon: JSX.Element;
  }
  const games: game[] = [
    {
      value: "volvo",
      label: "Volvo",
      icon: <Image src="/hotsale/a.png" width={24} height={24} alt="new" />,
    },
    {
      value: "saab",
      label: "Saab",
      icon: <Image src="/hotsale/a.png" width={24} height={24} alt="new" />,
    },
    {
      value: "mercedes",
      label: "Mercedes",
      icon: <Image src="/hotsale/a.png" width={24} height={24} alt="new" />,
    },
    {
      value: "audi",
      label: "Audi",
      icon: (
        <Image
          src="/hotsale/a.png"
          width={24}
          height={24}
          alt="new"
          className=" rounded-full"
        />
      ),
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value, name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      game: selectedValue,
      item: buttonValue,
      server: selectedServer,
    };
    const jsonData = JSON.stringify(updatedFormData);
    console.log(jsonData); // You can handle the JSON data here
  };

  const handleButtonClick = (event: string) => {
    setButtonValue(event);
    console.log(event);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="submit-btn">
          Submit
        </button>

        {/* For demo purposes, showing current selected value */}
        <p>Selected Value: {selectedValue}</p>
        <p>server Value: {selectedServer}</p>

        {/* Inline CSS */}
      </form>
      <form action="" onSubmit={handleSubmit}>
        <CustomSelect games={games} onSelect={setSelectedValue} />
        <div className=" flex hotsalehover w-full my-6 flex-wrap  gap-3">
          {packages.map((item, i) => (
            <div
              key={i}
              className="w-[89.75px] h-[40px] bg-gradient-to-l from-purple-500 via-indigo-200 to-purple-100 relative rounded-[10px]"
            >
              <button
                type="button"
                value={item.title}
                className={`select-btn ${
                  buttonValue === item.title
                    ? "w-[81.75px] h-[32px] bg-[#161F33] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-[4.5px]  outline-transparent rounded-md flex items-center gap-3 p-2"
                    : "w-[81.75px] h-[32px] bg-[#161F33] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-[4.5px] outline-[#334155] hover:outline-transparent rounded-md flex items-center gap-3 p-2"
                }`}
                onClick={() => handleButtonClick(item.title)}
              >
                <Image
                  src={item.img}
                  width={18}
                  height={18}
                  alt={item.title}
                  className=" rounded-full"
                />
                <h6 className=" text-[#D6E0EB] text-base font-normal">
                  {item.title}
                </h6>
              </button>
            </div>
          ))}
        </div>
        <CustomSelect
          servers={serveres}
          server="true"
          onSelect={setSelectedSever}
        />
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SaleForm;
