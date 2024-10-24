"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function CategoryList({ categoryList }) {
  const pathname = usePathname();
  const selectedCategory = decodeURIComponent(pathname.split('/')[2]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const selectedCategory = decodeURIComponent(pathname.split('/')[2]); // Ensure URL-decoding
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className='pl-2 pr-5 flex flex-col'>
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
  );
}

export default CategoryList;
