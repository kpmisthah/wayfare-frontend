'use client'
import React from "react";
import { Navigation, Heart } from "lucide-react";
import { useDestinations } from "../hooks/use-destination";
import { useRouter } from "next/navigation";

export const Destination = () => {
  const { popularDestinations } = useDestinations();
  const router = useRouter();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trending Destinations
            </h2>
            <p className="text-gray-600">
              Discover the most popular places right now
            </p>
          </div>
          <button className="mt-4 md:mt-0 text-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-2 font-medium">
            <span>Explore All</span>
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        {popularDestinations.length === 0 ? (
          <p className="text-gray-500 text-center">No popular destinations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${destination.picture[0]}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{destination.title}</h3>
                    <span className="text-blue-600 font-semibold text-sm">{destination.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{destination.destination}</p>
                  <p className="text-gray-500 text-sm mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => router.push(`/packages/${destination.id}`)}
                      className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
