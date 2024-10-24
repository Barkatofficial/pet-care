"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Icons for menu

function CategoryList({ categoryList }) {
  const pathname = usePathname();
  const selectedCategory = decodeURIComponent(pathname.split('/')[2]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for opening/closing sidebar

  useEffect(() => {
    const selectedCategory = decodeURIComponent(pathname.split('/')[2]);
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategorySelect = () => {
    // Close the sidebar after selecting a category (for mobile screens only)
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Menu button for mobile */}
      <button 
        className="md:hidden text-xl p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:-translate-x-0 md:static md:flex flex-col pl-2 pr-5`}>
        
        <Command>
          <CommandList className='overflow-visible'>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Suggestions">
              {categoryList && categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link
                    href={`/search/${encodeURIComponent(item.attributes.Name)}`}
                    className={`p-2 flex gap-2 text-[14px] text-blue-600 items-center rounded-md w-full
                      ${decodeURIComponent(currentCategory) === item.attributes.Name ? 'bg-blue-100' : ''}
                    `}
                    onClick={handleCategorySelect} // Close sidebar on mobile after selection
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes?.url}
                      alt='icon'
                      width={25}
                      height={25}
                      className='object-contain'
                    />
                    <span>{item.attributes.Name}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* Overlay for closing sidebar on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default CategoryList;
