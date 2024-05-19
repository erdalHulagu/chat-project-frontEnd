
const upDateProfile = () => {
    console.log('Create Group');
};

const handleHomePage = () => {
    console.log('update');
};

const handleLogOut = () => {
    console.log('Add Existing Community');
};

const menuItems = [
    { label: 'Up Date Profile',onClick: upDateProfile },
    { label: 'Home Page', onClick: handleHomePage },
    { label: 'Log Out', onClick: handleLogOut},
];

export default menuItems;