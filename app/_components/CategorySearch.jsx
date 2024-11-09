import Image from 'next/image';
import StatsSection from './StatsSection';
import Link from 'next/link';

function CategorySearch({ categoryList }) {

  return (
    <div className="mb-10 mt-10 items-center flex flex-col gap-4">
      <h2 className="font-bold text-4xl tracking-wide text-center">
        Our <span className="text-primary">Services</span>
      </h2>

      {/* Center the grid and ensure proper alignment */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center items-center">
          {categoryList.map((item, index) => (
            <Link href={'/search/' + item.id}
              key={index}
              className="flex flex-col text-center items-center
              p-6 md:p-5 bg-blue-50 m-2 rounded-lg cursor-pointer
              gap-2 hover:scale-110 transition-all ease-in-out"
            >
              <Image
                src={item.icon}
                alt="icon"
                width={40}
                height={40}
              />
              <label className="text-black-600 text-sm">
                {item.name}
              </label>
            </Link>
          ))}
        </div>
      <StatsSection />
    </div>
  );
}

export default CategorySearch;
