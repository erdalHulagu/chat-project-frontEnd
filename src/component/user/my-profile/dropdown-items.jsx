import React from 'react';

const DropdownItem = ({ label, onClick }) => (
    <div
        onClick={onClick}
        className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center w-full h-62 px-2 hover:bg-gray-400 cursor-pointer'
    >
        {label}
    </div>
);

export default DropdownItem;