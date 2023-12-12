import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  const handleDropDownMenu = () => {
    setIsOpen(!isOpen)
  }
  

  return (
    <div className="relative inline-block text-left">
      <div>
        <IoIosArrowDropdownCircle
        className='m-1 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full'
        onClick={handleDropDownMenu}
          />
         
        
      </div>

      {isOpen && (
        <div className="origin-top-right absolute -mr-44 right-0 w-56 rounded-md shadow-lg bg-slate-100 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item, index) => (<>
                <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300"
              >
                {item}
              </a>
              </>
             
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;