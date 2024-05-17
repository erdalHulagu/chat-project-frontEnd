const handleCreateGroup = () => {
    console.log('Create Group');
};

const handleCreateCommunityGroup = () => {
    console.log('Create Community Group');
};

const handleAddExistingCommunity = () => {
    console.log('Add Existing Community');
};

const menuItems = [
    { label: 'All Groups' },
    { label: 'Create New Community', onClick: handleCreateCommunityGroup },
    { label: 'Add Existing Community', onClick: handleAddExistingCommunity },
    { label: 'Create New Group', onClick: handleCreateGroup },
];

export default menuItems;