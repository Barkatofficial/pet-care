import Image from 'next/image';

export default function About() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-75"></div>
                <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 text-center relative z-10">
                    <h1 className="text-6xl font-bold text-white mb-4 animate-fadeIn">About Us</h1>
                    <p className="text-xl text-white max-w-2xl animate-fadeIn delay-2s">
                        Discover who we are, what drives us, and the values we uphold. We're excited to share our story.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <section className="container mx-auto py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/concept1.png"
                            alt="Team Member 1"
                            width={400}
                            height={400}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Jane Doe</h3>
                            <p className="text-gray-600">Chief Visionary Officer</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/concept1.png"
                            alt="Team Member 2"
                            width={400}
                            height={400}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800">John Smith</h3>
                            <p className="text-gray-600">Lead Developer</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/concept1.png"
                            alt="Team Member 3"
                            width={400}
                            height={400}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Emily Stone</h3>
                            <p className="text-gray-600">Head of Marketing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
                    <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
                        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-sm text-center">
                            <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                            <p className="text-gray-600">We continuously strive to redefine the standard of excellence in everything we do.</p>
                        </div>
                        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-sm text-center">
                            <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
                            <p className="text-gray-600">Honesty and transparency are at the heart of all our interactions.</p>
                        </div>
                        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-sm text-center">
                            <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
                            <p className="text-gray-600">We aim to achieve the highest standards in both product and service.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-yellow-500 py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Join Us on Our Journey</h2>
                    <p className="text-xl text-white mb-8">
                        Ready to be part of something special? We're constantly innovating and evolving—let's shape the future together.
                    </p>
                    <button className="bg-white text-yellow-500 py-4 px-8 rounded-lg font-semibold text-xl hover:bg-gray-100 transition duration-300">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
}
