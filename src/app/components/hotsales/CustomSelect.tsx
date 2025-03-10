import Image from "next/image";
import React, { useState, useRef, useEffect, JSX } from "react";
import { FaCaretDown } from "react-icons/fa6";
interface Game {
  value: string;
  label: string;
  icon: JSX.Element;
}

// Define interface for extra server
interface ExtraServer {
  middleServer: string[]; // Array of strings
  servers: { servername: string }[]; // Array of server objects
}

// Define main server interface
interface Server {
  serverName: string;
  extraserver: ExtraServer;
}

interface CustomSelectProps {
  games?: Game[];
  servers?: Server[];
  onSelect: (value: string) => void;
  placeholder?: string;
  server?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  games,
  onSelect,
  placeholder = "Select an option",
  server,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  servers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter games based on the search query
  const filteredGames = games?.filter((game) =>
    game.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServer = servers?.filter((sv) => {
    sv.serverName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectRef = useRef<HTMLDivElement>(null);

  // toggle dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // handle game selection
  const handleSelect = (game: Game) => {
    setSelectedOption(game);
    onSelect(game.value);
    setIsOpen(false);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {/* Select Box */}
      <div
        className="flex items-center w-[389px] border border-[#334155] justify-between rounded-lg p-4 cursor-pointer bg-[#0F172A] text-white"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? selectedOption.icon : null}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        {/* Custom Caret */}
        <div
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {server ? (
            <Image
              src="/hotsale/server.svg"
              width={20.48}
              height={19.17}
              alt="server"
            />
          ) : (
            <FaCaretDown />
          )}
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 top-full mt-1 w-full h-[200px] overflow-y-scroll overflow-x-hidden bg-[#0F172A] border border-[#334155] text-white rounded-lg shadow-md z-10">
          <div className=" relative">
            <button className=" absolute top-1/2 left-10 -translate-y-1/2">
              <Image
                src="/assets/images/header/Search.svg"
                width={20}
                height={20}
                alt="hello"
              />
            </button>
            <input
              className=" w-[356px] h-12 border border-[#334155] text-[#D6E0EB] rounded-lg outline-0 shadow-md z-10 m-4 indent-[52px] placeholder:text-[#D6E0EB]"
              placeholder="Search Game"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredGames?.map((game) => (
            <li
              key={game.value}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(game)}
            >
              {game.icon}
              {game.label}
            </li>
          ))}
          <div className=" w-[356px] flex gap-3  m-4">
            <div className=" w-1/3 border-r border-[#334155] flex flex-col gap-2">
              <div className=" flex gap-2 mx-0 p-2 rounded-xl hover:bg-red-300 my-2">
                <Image src="/hotsale/na.png" alt="na" width={24} height={24} />
                <span>NA</span>
              </div>
              <div className=" flex gap-2 mx-0 p-2 rounded-xl hover:bg-red-300 my-2">
                <Image src="/hotsale/jp.png" alt="jp" width={24} height={24} />
                <span>JP</span>
              </div>
              <div className=" flex gap-2 mx-0 p-2 rounded-xl hover:bg-red-300 my-2">
                <Image
                  src="/hotsale/oce.png"
                  alt="oce"
                  width={24}
                  height={24}
                />
                <span>OCE</span>
              </div>
            </div>
            <hr />
            <div className=" w-1/3 border-r border-[#334155] flex flex-col gap-4 mt-3">
              <div className="mx-0 my-2">
                <span>ALL</span>
              </div>
              <div className="mx-0 my-2">
                <span>Aether</span>
              </div>
              <div className="mx-0 my-2">
                <span>Aether</span>
              </div>
              <div className="mx-0 my-2">
                <span>Aether</span>
              </div>
            </div>
            <hr />
            <div className=" w-1/3 border-r border-[#334155] flex flex-col gap-4 mt-3">
              <div className="mx-0 my-2">
                <span>Adamantoise</span>
              </div>
              <div className="mx-0 my-2">
                <span>Cactuar</span>
              </div>
              <div className="mx-0 my-2">
                <span>Faerie</span>
              </div>
              <div className="mx-0 my-2">
                <span>Gilgamesh</span>
              </div>
              <div className="mx-0 my-2">
                <span>Jenova</span>
              </div>
            </div>
            <hr />
          </div>
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
