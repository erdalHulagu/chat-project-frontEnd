
import React, { useMemo, useState } from "react";
import { FiSearch, FiUsers, FiCheck, FiPlus } from "react-icons/fi";
import ExistingGroupCard from "./exsisting-group-card";

const AddExsistingComminity = ({
    groups = [],
    communityId,
    onSave,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const filteredGroups = useMemo(() => {
        const availableGroups = groups.filter(
            (group) => !group.communityId
        );

        return availableGroups.filter((group) =>
            (group.chatName || group.groupName || group.name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [groups, searchTerm]);

    const handleSelect = (group) => {
        setSelectedGroups((previous) => {
            const exists = previous.some(
                (item) => item.id === group.id
            );

            if (exists) {
                return previous.filter(
                    (item) => item.id !== group.id
                );
            }

            return [...previous, group];
        });
    };

    const handleSubmit = async () => {
        if (!communityId) {
            setErrorMessage("Lütfen önce bir Community seçin.");
            return;
        }

        if (selectedGroups.length === 0) {
            setErrorMessage("Lütfen en az bir grup seçin.");
            return;
        }

        if (!onSave) {
            setErrorMessage("Grup ekleme işlemi henüz bağlanmadı.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            await onSave(selectedGroups);

            setSelectedGroups([]);
            setSearchTerm("");
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message ||
                "Gruplar Community'ye eklenirken hata oluştu."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <FiUsers size={22} />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-text">
                            Add Existing Groups
                        </h2>
                        <p className="text-xs text-text-muted">
                            Select the groups you want to add to this community.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative mb-5">
                <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                    size={18}
                />

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search groups..."
                    className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text outline-none focus:border-primary"
                />
            </div>

            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-text">
                    Available Groups
                </span>

                <span className="text-xs text-text-muted">
                    {selectedGroups.length} selected
                </span>
            </div>

            <div className="space-y-3">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <ExistingGroupCard
                            key={group.id}
                            group={group}
                            selected={selectedGroups.some(
                                (item) => item.id === group.id
                            )}
                            onSelect={handleSelect}
                        />
                    ))
                ) : (
                    <div className="rounded-xl border border-dashed border-border py-10 text-center">
                        <FiUsers
                            className="mx-auto mb-3 text-text-muted"
                            size={30}
                        />
                        <p className="text-sm text-text-muted">
                            No available groups found.
                        </p>
                    </div>
                )}
            </div>

            {errorMessage && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
                    {errorMessage}
                </p>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <button
                    type="button"
                    onClick={() => setSelectedGroups([])}
                    disabled={loading}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-background disabled:opacity-50"
                >
                    Clear Selection
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || selectedGroups.length === 0}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FiPlus size={17} />
                    {loading ? "Adding..." : "Add Selected Groups"}
                </button>
            </div>
        </div>
    );
};

export default AddExsistingComminity;
