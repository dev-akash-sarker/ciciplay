import Image from "next/image";
import { FC, JSX, useEffect, useMemo, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface Game {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface CustomSelectProps {
  games: Game[];
  onSelect: (value: string) => void;
  placeholder: string;
}

const SelectGame: FC<CustomSelectProps> = ({ games = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const selectRef = useRef<HTMLDivElement>(null);

  // Filter games based on search term
  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [games, searchTerm]);

  // Update selected option to the first filtered game when the dropdown opens
  useEffect(() => {
    if (isOpen && filteredGames.length > 0 && !selectedOption) {
      setSelectedOption(filteredGames[0]);
    }
  }, [isOpen, filteredGames, selectedOption]);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setSearchTerm(""); // Optional: Clear search when opening dropdown
  };

  // Handle option select
  const handleSelect = (game: Game) => {
    setSelectedOption(game);
    onSelect(game.value);
    setIsOpen(false);
    setSearchTerm(""); // Clear search on selection
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
      {/* Selected option or placeholder */}
      <div
        className="flex items-center w-[389px] border border-[#334155] justify-between rounded-lg p-4 cursor-pointer bg-[#0F172A] text-white"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <>
              <span>{selectedOption.icon}</span>
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{games[0].icon}</span>
              <span className="text-gray-400">{games[0].label}</span>
            </div>
          )}
        </div>
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
            {/* Search bar */}
            <div className="relative p-4">
              <button className="absolute top-1/2 left-8 -translate-y-1/2">
                <Image
                  src="/assets/images/header/Search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                className="w-full h-12 border border-[#334155] text-[#D6E0EB] rounded-lg outline-none shadow-md pl-12 placeholder:text-[#D6E0EB]"
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!isOpen) setIsOpen(true); // Open dropdown when typing
                }}
              />
            </div>

            {/* Game List */}
            <nav>
              {filteredGames.length > 0 ? (
                <ul>
                  {filteredGames.map((game, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 px-4 py-4 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSelect(game)}
                    >
                      {game.icon}
                      {game.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No game found
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectGame;
