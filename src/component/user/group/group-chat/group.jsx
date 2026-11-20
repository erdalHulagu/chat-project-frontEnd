
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupDropdownMenu from "../group-dropdown-menu";
import CreateGroupCard from "./create-group/create-group-card";
import CreateComminityGroup from "./comminity-group/create-comminity-group";
import AddExsistingComminity from "./create-existing-group/add-existing-comminity";

import {
  FiArrowLeft,
  FiUsers,
  FiPlus,
  FiGlobe,
  FiUserPlus,
  FiLayers,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";

const Group = () => {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState(null);

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleCreateGroup = () => {
    setActiveView("createGroup");
  };

  const handleCreateCominityGroup = () => {
    setActiveView("createCommunity");
  };

  const handleAddExistingComminity = () => {
    setActiveView("addCommunity");
  };

  const handleCloseView = () => {
    setActiveView(null);
  };

  const viewDetails = {
    createGroup: {
      title: "Create New Group",
      description: "Create a new group and invite people to join.",
      icon: <FiUsers size={20} />,
    },
    createCommunity: {
      title: "Create Community",
      description: "Create a community to bring people together.",
      icon: <FiGlobe size={20} />,
    },
    addCommunity: {
      title: "Add Existing Community",
      description: "Connect an existing community to your groups.",
      icon: <FiUserPlus size={20} />,
    },
  };

  const quickActions = [
    {
      title: "Create a Group",
      description: "Start a new group and connect with people.",
      icon: <FiUsers size={24} />,
      action: handleCreateGroup,
    },
    {
      title: "Create a Community",
      description: "Build a community around shared interests.",
      icon: <FiGlobe size={24} />,
      action: handleCreateCominityGroup,
    },
    {
      title: "Add Existing Community",
      description: "Add a community that already exists.",
      icon: <FiUserPlus size={24} />,
      action: handleAddExistingComminity,
    },
  ];

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-background md:flex-row">

      {/* LEFT SIDEBAR */}
      <aside className="flex h-[300px] w-full shrink-0 flex-col border-b border-border bg-surface md:h-full md:w-[320px] md:border-b-0 md:border-r lg:w-[350px]">

        {/* Sidebar Header */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-border bg-surface px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNavigate}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-primary transition hover:bg-primary-soft hover:text-primary-dark"
            >
              <FiArrowLeft size={22} />
            </button>

            <div>
              <h2 className="text-base font-bold text-text">
                Groups
              </h2>
              <p className="text-xs text-text-muted">
                Groups and communities
              </p>
            </div>
          </div>

          <GroupDropdownMenu
            handleCreateGroup={handleCreateGroup}
            handleCreateCominityGroup={handleCreateCominityGroup}
            handleAddExistingComminity={handleAddExistingComminity}
          />
        </div>

        {/* Sidebar Content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">

          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Workspace
            </h3>
          </div>

          {/* All Groups */}
          <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-primary-soft px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <FiLayers size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-primary-dark">
                All Groups
              </p>
              <p className="text-xs text-primary/70">
                Manage your groups
              </p>
            </div>
          </div>

          {/* Empty Groups State */}
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background text-text-muted">
              <FiUsers size={30} />
            </div>

            <h3 className="text-sm font-semibold text-text">
              Your groups will appear here
            </h3>

            <p className="mt-2 max-w-[230px] text-xs leading-5 text-text-muted">
              Create a group or add an existing community to get started.
            </p>

            <button
              type="button"
              onClick={handleCreateGroup}
              className="mt-5 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              <FiPlus size={17} />
              Create Group
            </button>
          </div>

          {/* Sidebar Footer */}
          <div className="mt-auto rounded-xl border border-border bg-background p-3">
            <div className="flex items-center gap-2">
              <FiMessageCircle className="text-primary" size={18} />
              <p className="text-xs font-semibold text-text">
                Stay connected
              </p>
            </div>

            <p className="mt-1 text-xs leading-5 text-text-muted">
              Create communities and groups to connect with people.
            </p>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-background">

        {activeView ? (
          <>
            {/* Form Header */}
            <div className="sticky top-0 z-20 flex min-h-[76px] shrink-0 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  {viewDetails[activeView].icon}
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-base font-bold text-text sm:text-lg">
                    {viewDetails[activeView].title}
                  </h1>
                  <p className="truncate text-xs text-text-muted">
                    {viewDetails[activeView].description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseView}
                aria-label="Close form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-secondary transition hover:bg-red-50 hover:text-danger"
              >
                <FiX size={21} />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
              <div className="my-auto w-full max-w-3xl">

                {activeView === "createGroup" && (
                  <CreateGroupCard />
                )}

                {activeView === "createCommunity" && (
                  <CreateComminityGroup />
                )}

                {activeView === "addCommunity" && (
                  <AddExsistingComminity />
                )}

              </div>
            </div>
          </>
        ) : (
          /* Welcome Dashboard */
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center p-5 sm:p-8 lg:p-12">

            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-primary-light p-6 shadow-lg sm:p-10">
              <div className="relative z-10 max-w-2xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                  <FiUsers size={29} />
                </div>

                <p className="mb-2 text-sm font-medium text-white/70">
                  YOUR COMMUNITY SPACE
                </p>

                <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Connect, create and grow together.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                  Create groups, build communities and bring people
                  together in one place. Start building your community today.
                </p>

                <button
                  type="button"
                  onClick={handleCreateGroup}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary-dark shadow-md transition hover:bg-primary-soft"
                >
                  <FiPlus size={18} />
                  Create Your First Group
                </button>
              </div>

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
              <div className="pointer-events-none absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-white/5" />
            </div>

            {/* Quick Actions */}
            <div className="mt-9">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-text">
                  Get started
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Choose what you want to do.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {quickActions.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={item.action}
                    className="group flex min-h-[170px] flex-col items-start rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition duration-200 group-hover:bg-primary group-hover:text-white">
                      {item.icon}
                    </div>

                    <h3 className="mt-5 text-sm font-bold text-text transition group-hover:text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-text-muted">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Information */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiGlobe size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-text">
                    Build your community
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Bring people together around shared interests.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateCominityGroup}
                className="shrink-0 rounded-xl border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Create Community
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Group;
