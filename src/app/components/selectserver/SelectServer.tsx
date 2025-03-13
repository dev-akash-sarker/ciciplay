import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface ExtraServer {
  middleServer: string[];
  servers: { servername: string }[];
}

interface Server {
  serverName: string;
  extraserver: ExtraServer;
}

interface CustomSelectProps {
  servers: Server[];
  onSelect: (region: string, middleServer?: string, server?: string) => void;
  placeholder?: string;
}

const SelectServer: FC<CustomSelectProps> = ({
  servers = [],
  onSelect,
  placeholder = "Select server",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>(
    servers[0]?.serverName || ""
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ Store full selected data
  const [selectedData, setSelectedData] = useState<{
    region: string;
    type: "middle" | "server";
    value: string;
  } | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);

  const selectedRegionData = servers.find(
    (region) => region.serverName === selectedRegion
  );

  const filteredMiddleServers =
    selectedRegionData?.extraserver.middleServer.filter((middle) =>
      middle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredServers = selectedRegionData?.extraserver.servers.filter(
    (srv) => srv.servername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setSearchTerm(""); // Reset search when opening
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
          {selectedData ? (
            <>
              {/* Flag Icon */}
              <Image
                src={`/hotsale/${selectedData.region.toLowerCase()}.png`}
                alt={selectedData.region}
                width={24}
                height={24}
              />
              {/* Display Name */}
              <span>{`${selectedData.region} / ${selectedData.value}`}</span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/hotsale/server.svg"
                width={20.48}
                height={19.17}
                alt="server"
              />
              <span className="text-gray-400">{placeholder}</span>
            </div>
          )}
        </div>
        {/* Caret Icon */}
        <div
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaCaretDown />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full max-h-[300px] overflow-y-auto bg-[#0F172A] border border-[#334155] text-white rounded-lg shadow-md z-10">
          <div className="relative">
            {/* Search Bar */}
            <div className="relative">
              <button className="absolute top-1/2 left-8 -translate-y-1/2">
                <Image
                  src="/assets/images/header/Search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                className="w-[356px] h-12 border border-[#334155] text-[#D6E0EB] rounded-lg outline-none shadow-md m-4 pl-12 placeholder:text-[#D6E0EB] bg-transparent"
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Servers Section */}
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
                      setSearchTerm(""); // Reset search when region is changed
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
              <div className="w-1/3 border-r border-[#334155] flex flex-col gap-2 overflow-auto">
                {filteredMiddleServers?.length ? (
                  filteredMiddleServers.map((middle, idx) => (
                    <div
                      key={idx}
                      className="p-2 cursor-pointer hover:bg-gray-600 rounded"
                      onClick={() => {
                        setSelectedData({
                          region: selectedRegion,
                          type: "middle",
                          value: middle,
                        });
                        onSelect(selectedRegion, middle);
                        setIsOpen(false);
                      }}
                    >
                      <span>{middle}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No middle server</p>
                )}
              </div>

              {/* Final Servers */}
              <div className="w-1/3 flex flex-col gap-2 overflow-auto">
                {filteredServers?.length ? (
                  filteredServers.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-2 cursor-pointer hover:bg-gray-600 rounded"
                      onClick={() => {
                        setSelectedData({
                          region: selectedRegion,
                          type: "server",
                          value: srv.servername,
                        });
                        onSelect(selectedRegion, undefined, srv.servername);
                        setIsOpen(false);
                      }}
                    >
                      <span>{srv.servername}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No server found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectServer;
