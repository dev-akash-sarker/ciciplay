import Image from "next/image";
import React, { useState, useRef, useEffect, JSX } from "react";
import { FaCaretDown } from "react-icons/fa6";

interface Game {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface ExtraServer {
  middleServer: string[];
  servers: { servername: string }[];
}

interface Server {
  serverName: string;
  extraserver: ExtraServer;
}

interface CustomSelectProps {
  games?: Game[];
  servers?: Server[];
  onSelect: (value: string | { region: string; server: string }) => void;
  placeholder?: string;
  server?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  games = [],
  onSelect,
  placeholder = "Select an option",
  server,
  servers = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>(
    servers[0]?.serverName || "NA"
  );

  const selectRef = useRef<HTMLDivElement>(null);

  // Filter games
  const filteredGames = games.filter((game) =>
    game.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find selected region's data
  const selectedData = servers.find(
    (region) => region.serverName === selectedRegion
  );

  // Filter middle servers and servers based on search term
  const filteredMiddleServers = selectedData?.extraserver.middleServer.filter(
    (middle) => middle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServers = selectedData?.extraserver.servers.filter((srv) =>
    srv.servername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle game selection
  const handleSelect = (game: Game) => {
    setSelectedOption(game);
    onSelect(game.value);
    setIsOpen(false);
  };

  // Close dropdown on outside click
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
          {selectedOption?.icon}
          <span>{selectedOption?.label || placeholder}</span>
        </div>
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

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full max-h-[300px] overflow-y-auto bg-[#0F172A] border border-[#334155] text-white rounded-lg shadow-md z-10">
          <div className="relative">
            {/* Search Bar */}
            <div className=" relative">
              <button className="absolute top-1/2 left-8 -translate-y-1/2">
                <Image
                  src="/assets/images/header/Search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                className="w-[356px] h-12 border border-[#334155] text-[#D6E0EB] rounded-lg outline-none shadow-md m-4 pl-12 placeholder:text-[#D6E0EB]"
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Conditional rendering for Server or Game */}
            {server ? (
              <div className="w-[356px] flex gap-3 m-4">
                {/* Regions */}
                <div className="w-1/3 border-r border-[#334155] flex flex-col gap-2">
                  {servers.map((region, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2 p-2 rounded-xl cursor-pointer hover:bg-red-300 ${
                        selectedRegion === region.serverName ? "bg-red-300" : ""
                      }`}
                      onClick={() => {
                        setSelectedRegion(region.serverName);
                        onSelect(region.serverName); // Send selected servername to parent
                        setIsOpen(false);
                      }}
                    >
                      <Image
                        src={`/hotsale/${region.serverName.toLowerCase()}.png`}
                        alt={region.serverName}
                        width={24}
                        height={24}
                      />
                      <span>{region.serverName}</span>
                    </div>
                  ))}
                </div>

                {/* Middle Servers */}
                <div className="w-1/3 border-r border-[#334155] flex flex-col gap-4 mt-3">
                  {filteredMiddleServers?.length ? (
                    filteredMiddleServers.map((middle, idx) => (
                      <div key={idx} className="p-2">
                        <span>{middle}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No middle server
                    </p>
                  )}
                </div>

                {/* Final Servers */}
                <div className="w-1/3 flex flex-col gap-4 mt-3">
                  {filteredServers?.length ? (
                    filteredServers.map((srv, idx) => (
                      <div key={idx} className="p-2">
                        <span>{srv.servername}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No server found</p>
                  )}
                </div>
              </div>
            ) : (
              <ul>
                {filteredGames.length ? (
                  filteredGames.map((game) => (
                    <li
                      key={game.value}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSelect(game)}
                    >
                      {game.icon}
                      {game.label}
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No game found</p>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
