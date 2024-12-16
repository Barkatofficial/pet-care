import Image from 'next/image';
import Link from 'next/link';

export default function CategorySearch({ categoryList }) {
  return (
    <div className="mb-10 mt-10 flex flex-col items-center gap-8">
      {/* Heading Section */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'Apple Garamond, serif',
          fontSize: '80px',
          fontWeight: 'bold',
          lineHeight: '1.1',
          color: '#000000',
        }}
      >
        Tailored Care, <br /> One Paw at a Time
      </h2>

      {/* Cards Section - Vertical Stacking */}
      <div className="flex flex-col gap-6 w-full max-w-screen-md">
        {categoryList.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center bg-yellow-50 p-6 rounded-lg shadow-md gap-6"
          >
            {/* Image */}
            <div className="w-1/3">
              <Image
                src={item.icon}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            {/* Text Content */}
            <div className="w-2/3">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
