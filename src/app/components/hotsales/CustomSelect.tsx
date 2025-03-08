import React, { useState, useRef, useEffect, JSX } from "react";
import { FaCaretDown } from "react-icons/fa6";
interface Game {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface CustomSelectProps {
  games: Game[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  games,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Game | null>(null);
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
          <FaCaretDown />
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 top-full mt-1 w-full h-[200px] overflow-y-scroll overflow-x-hidden bg-[#0F172A] border border-[#334155] text-white rounded-lg shadow-md z-10">
          <div className=" w-[356px] h-12 border border-[#334155] text-white rounded-lg shadow-md z-10 m-4"></div>
          {games.map((game) => (
            <>
              <li
                key={game.value}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(game)}
              >
                {game.icon}
                {game.label}
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
