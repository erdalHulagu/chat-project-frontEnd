
import React, { useEffect, useRef, useState } from "react";
import {
  FiUsers,
  FiPlus,
  FiLayers,
  FiChevronRight,
  FiX,
  FiGlobe,
} from "react-icons/fi";

const DropdownMenu = ({
  handleCreateGroup,
  handleCreateCominityGroup,
  handleAddExistingComminity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuRef = useRef(null);

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((previous) => !previous);
    setActiveSubmenu(null);
  };

  const handleAction = (callback) => {
    setIsOpen(false);
    setActiveSubmenu(null);
    callback?.();
  };

  const submenuButtonClass = (isActive) =>
    `group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary-soft text-primary-dark"
        : "text-text-secondary hover:bg-primary-soft hover:text-primary-dark"
    }`;

  const actionButtonClass =
    "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-primary-soft hover:text-primary-dark";

  return (
    <div ref={menuRef} className="relative z-50 flex h-full items-center">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Open group menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 sm:h-11 sm:w-11 ${
          isOpen
            ? "border-primary/20 bg-primary-soft text-primary shadow-inner"
            : "border-transparent bg-transparent text-primary-dark hover:border-primary/10 hover:bg-primary-soft"
        }`}
      >
        <FiUsers size={21} />
      </button>

      {isOpen && (
        <>
          {/* Dropdown panel */}
          <div
            className="absolute right-0 top-full z-50 mt-3 w-64 overflow-visible rounded-2xl border border-border bg-surface shadow-2xl shadow-slate-900/10"
            role="menu"
          >
            {/* Header */}
            <div className="rounded-t-2xl bg-gradient-to-r from-primary-dark via-primary to-primary-light px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                  <FiUsers size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Group Management
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    Manage your groups
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="space-y-1 p-2">
              {/* All Groups */}
              <button
                type="button"
                role="menuitem"
                onClick={() => handleAction()}
                className={actionButtonClass}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <FiLayers size={18} />
                </span>

                <span className="flex-1">All Groups</span>
              </button>

              {/* Create Community */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("community")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={activeSubmenu === "community"}
                  onClick={() =>
                    setActiveSubmenu((previous) =>
                      previous === "community" ? null : "community"
                    )
                  }
                  className={submenuButtonClass(
                    activeSubmenu === "community"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors">
                      <FiGlobe size={18} />
                    </span>
                    <span>Create Community</span>
                  </span>

                  <FiChevronRight
                    size={16}
                    className={`transition-transform ${
                      activeSubmenu === "community" ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeSubmenu === "community" && (
                  <div className="absolute left-full top-0 z-[60] ml-2 w-60 rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-slate-900/10">
                    <div className="px-3 py-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Community
                      </p>
                    </div>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() =>
                        handleAction(handleCreateCominityGroup)
                      }
                      className={actionButtonClass}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white">
                        <FiPlus size={18} />
                      </span>
                      <span>Create New Community</span>
                    </button>

                    <div className="my-1 border-t border-border" />

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() =>
                        handleAction(handleAddExistingComminity)
                      }
                      className={actionButtonClass}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white">
                        <FiUsers size={18} />
                      </span>
                      <span>Add Existing Community</span>
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
                  aria-expanded={activeSubmenu === "groups"}
                  onClick={() =>
                    setActiveSubmenu((previous) =>
                      previous === "groups" ? null : "groups"
                    )
                  }
                  className={submenuButtonClass(activeSubmenu === "groups")}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <FiUsers size={18} />
                    </span>
                    <span>Add Groups</span>
                  </span>

                  <FiChevronRight
                    size={16}
                    className={`transition-transform ${
                      activeSubmenu === "groups" ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeSubmenu === "groups" && (
                  <div className="absolute left-full top-0 z-[60] ml-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-slate-900/10">
                    <div className="px-3 py-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Groups
                      </p>
                    </div>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleAction(handleCreateGroup)}
                      className={actionButtonClass}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white">
                        <FiPlus size={18} />
                      </span>
                      <span>Create New Group</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-background/70 px-4 py-3">
              <p className="text-center text-xs text-text-muted">
                Manage your communities and groups
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
