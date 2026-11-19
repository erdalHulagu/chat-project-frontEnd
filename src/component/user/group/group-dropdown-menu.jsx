
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const DropdownMenu = ({
  handleCreateGroup,
  handleCreateCominityGroup,
  handleAddExistingComminity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuRef = useRef(null);

  // Menü dışına tıklanınca kapat.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setActiveSubmenu(null);
  };

  const handleAction = (callback) => {
    setIsOpen(false);
    setActiveSubmenu(null);
    callback?.();
  };

  return (
    <div
      ref={menuRef}
      className="relative z-50 flex h-full items-center justify-end"
    >
      {/* Ana menü butonu */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Grup menüsünü aç"
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition duration-200 hover:bg-primary-soft hover:text-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/15"
      >
        <IoIosArrowDropdownCircle className="h-8 w-8" />
      </button>

      {/* Ana dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-visible rounded-xl border border-border bg-white p-2 shadow-xl shadow-slate-900/10">

          {/* All Groups */}
          <button
            type="button"
            onClick={() => handleAction(() => {})}
            className="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm font-medium text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark"
          >
            All Groups
          </button>

          {/* Create Community */}
          <div
            className="relative"
            onMouseEnter={() => setActiveSubmenu("community")}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveSubmenu((prev) =>
                  prev === "community" ? null : "community"
                )
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                activeSubmenu === "community"
                  ? "bg-primary-soft text-primary-dark"
                  : "text-text-secondary hover:bg-primary-soft hover:text-primary-dark"
              }`}
            >
              Create Community

              <span className="text-xs">›</span>
            </button>

            {/* Community alt menüsü */}
            {activeSubmenu === "community" && (
              <div className="absolute left-full top-0 z-50 ml-1 w-52 rounded-xl border border-border bg-white p-2 shadow-xl shadow-slate-900/10">
                <button
                  type="button"
                  onClick={() =>
                    handleAction(handleCreateCominityGroup)
                  }
                  className="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark"
                >
                  Create New Community
                </button>

                <div className="my-1 border-t border-border" />

                <button
                  type="button"
                  onClick={() =>
                    handleAction(handleAddExistingComminity)
                  }
                  className="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark"
                >
                  Add Existing Community
                </button>
              </div>
            )}
          </div>

          {/* Add Groups */}
          <div
            className="relative"
            onMouseEnter={() => setActiveSubmenu("groups")}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setActiveSubmenu((prev) =>
                  prev === "groups" ? null : "groups"
                )
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                activeSubmenu === "groups"
                  ? "bg-primary-soft text-primary-dark"
                  : "text-text-secondary hover:bg-primary-soft hover:text-primary-dark"
              }`}
            >
              Add Groups

              <span className="text-xs">›</span>
            </button>

            {/* Groups alt menüsü */}
            {activeSubmenu === "groups" && (
              <div className="absolute left-full top-0 z-50 ml-1 w-48 rounded-xl border border-border bg-white p-2 shadow-xl shadow-slate-900/10">
                <button
                  type="button"
                  onClick={() =>
                    handleAction(handleCreateGroup)
                  }
                  className="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark"
                >
                  Create New Group
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
