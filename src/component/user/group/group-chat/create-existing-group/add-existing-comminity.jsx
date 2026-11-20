
import React, { useMemo, useState } from "react";

import {
  FiUsers,
  FiSearch,
  FiX,
  FiLayers,
  FiInfo,
  FiCheckCircle,
} from "react-icons/fi";

import ExistingGroupCard from "./exsisting-group-card";

const AddExsistingComminity = ({ groups = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Grup arama
  const filteredGroups = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return groups;

    return groups.filter((group) => {
      const name = group.groupName || group.name || "";
      return name.toLowerCase().includes(search);
    });
  }, [groups, searchTerm]);

  // Grup seçme / seçimden çıkarma
  const handleSelectGroup = (group) => {
    const groupId = group.id || group._id || group.groupId;

    setSelectedGroups((previous) => {
      const alreadySelected = previous.some(
        (item) =>
          (item.id || item._id || item.groupId) === groupId
      );

      return alreadySelected
        ? previous.filter(
            (item) =>
              (item.id || item._id || item.groupId) !== groupId
          )
        : [...previous, group];
    });
  };

  // Tüm seçimleri temizle
  const clearSelectedGroups = () => {
    setSelectedGroups([]);
  };

  return (
    <div className="mx-auto flex h-full min-h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-background/70 px-5 py-4 sm:px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <FiUsers size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-text sm:text-lg">
            Add Existing Community
          </h2>

          <p className="mt-0.5 text-xs text-text-muted">
            Select an existing group to add to your community.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="shrink-0 border-b border-border p-5 sm:px-6">
        <label
          htmlFor="existing-group-search"
          className="mb-2 block text-sm font-semibold text-text"
        >
          Search Groups
        </label>

        <div className="relative">
          <FiSearch
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />

          <input
            id="existing-group-search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by group name..."
            className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-11 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted transition hover:bg-primary-soft hover:text-primary"
            >
              <FiX size={17} />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-text-muted">
            Choose a group from the list below.
          </p>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {filteredGroups.length} Groups
            </span>

            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {selectedGroups.length} Selected
            </span>
          </div>
        </div>
      </div>

      {/* Group List */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        {filteredGroups.length > 0 ? (
          <div className="space-y-3">
            {filteredGroups.map((group, index) => {
              const groupId =
                group.id || group._id || group.groupId || index;

              const selected = selectedGroups.some((item) => {
                const itemId =
                  item.id || item._id || item.groupId;

                return itemId
                  ? itemId === groupId
                  : item === group;
              });

              return (
                <ExistingGroupCard
                  key={groupId}
                  group={group}
                  selected={selected}
                  onSelect={handleSelectGroup}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              {searchTerm ? (
                <FiSearch size={29} />
              ) : (
                <FiLayers size={29} />
              )}
            </div>

            <h3 className="text-base font-bold text-text">
              {searchTerm
                ? "No groups found"
                : "No available groups"}
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-text-muted">
              {searchTerm
                ? "Try searching with a different group name."
                : "There are currently no groups to add to this community."}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-background/70 px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <FiInfo size={16} className="shrink-0 text-primary" />

          <p className="text-xs leading-5 text-text-muted">
            {selectedGroups.length > 0
              ? `${selectedGroups.length} group(s) selected.`
              : "Select a group to add it to your community."}
          </p>
        </div>

        {selectedGroups.length > 0 && (
          <button
            type="button"
            onClick={clearSelectedGroups}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-danger transition hover:bg-red-50"
          >
            <FiX size={15} />
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default AddExsistingComminity;
