import { useState } from 'react';
import { Search, Globe, Sun } from 'lucide-react';
const Home = () => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );

  return (
    <div className="min-h-screen bg-[#f7fafa] text-[#0d171c]">
      <div className="mx-auto px-4 py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#0d171c]" />
            <h1 className="text-lg font-semibold">Weatherly</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full bg-[#e8f0f2] border-none w-[300px] text-sm focus:outline-none"
            />
          </div>
          <button className="p-2">
            <Globe className="h-5 w-5" />
          </button>
        </header>
        {/* Today's Highlights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Today's Highlights</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              'Asia',
              'Europe',
              'Australia',
              'North America',
              'South America',
            ].map((continent) => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  selectedContinent === continent
                    ? 'bg-[#0d171c] text-white'
                    : 'bg-[#e8f0f2] text-[#0d171c]'
                }`}
              >
                <Globe className="h-4 w-4" />
                {continent}
              </button>
            ))}
          </div>
        </section>

        {/* Current Location */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Current Location</h2>
          <p className="mb-6">Clear</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Temperature Card */}
            <div className="bg-[#e8f0f2] p-5 rounded-xl">
              <p className="text-sm mb-1">31°</p>
              <h3 className="text-3xl font-bold mb-1">31</h3>
              <p className="text-[#088736] text-sm">+3%</p>
            </div>

            {/* Feels Like Card */}
            <div className="bg-[#e8f0f2] p-5 rounded-xl">
              <p className="text-sm mb-1">Feels Like 31°</p>
              <h3 className="text-3xl font-bold mb-1">31</h3>
              <p className="text-[#e83608] text-sm">-2%</p>
            </div>

            {/* Humidity Card */}
            <div className="bg-[#e8f0f2] p-5 rounded-xl">
              <p className="text-sm mb-1">Humidity 47%</p>
              <h3 className="text-3xl font-bold mb-1">47</h3>
              <p className="text-[#088736] text-sm">+1%</p>
            </div>

            {/* Visibility Card */}
            <div className="bg-[#e8f0f2] p-5 rounded-xl">
              <p className="text-sm mb-1">Visibility 10.7km</p>
              <h3 className="text-3xl font-bold mb-1">10.7</h3>
              <p className="text-transparent text-sm">&nbsp;</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Timeline</h2>
          <div className="h-4 bg-[#d1e0e5] rounded-full"></div>
        </section>

        {/* Today's Weather */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Today's Weather</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Wind Status */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="h-40 bg-[#d1e0e5] relative">
                <img
                  src="/placeholder.svg?height=160&width=300"
                  alt="Wind visualization"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Wind Status</h3>
                <p className="text-sm text-gray-500">19km/h</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="h-40 bg-[#d1e0e5] relative">
                <img
                  src="/placeholder.svg?height=160&width=300"
                  alt="Water droplet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Humidity</h3>
                <p className="text-sm text-gray-500">46%</p>
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="h-40 bg-[#d1e0e5] relative">
                <img
                  src="/placeholder.svg?height=160&width=300"
                  alt="Eye visualization"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Visibility</h3>
                <p className="text-sm text-gray-500">10.7km</p>
              </div>
            </div>

            {/* Air Pressure */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="h-40 bg-[#d1e0e5] relative">
                <img
                  src="/placeholder.svg?height=160&width=300"
                  alt="Pressure gauge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Air Pressure</h3>
                <p className="text-sm text-gray-500">1026mb</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next 7 days */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Next 7 days</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {[
              {
                day: 'Tue',
                temp: '24°',
                img: '/placeholder.svg?height=160&width=160',
              },
              {
                day: 'Wed',
                temp: '26°',
                img: '/placeholder.svg?height=160&width=160',
              },
              {
                day: 'Thu',
                temp: '28°',
                img: '/placeholder.svg?height=160&width=160',
              },
              {
                day: 'Fri',
                temp: '30°',
                img: '/placeholder.svg?height=160&width=160',
              },
              {
                day: 'Sat',
                temp: '32°',
                img: '/placeholder.svg?height=160&width=160',
              },
            ].map((forecast) => (
              <div
                key={forecast.day}
                className="bg-white rounded-xl overflow-hidden"
              >
                <div className="h-40 bg-[#d1e0e5] relative">
                  <img
                    src={forecast.img || '/placeholder.svg'}
                    alt={`Weather for ${forecast.day}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{forecast.day}</h3>
                  <p className="text-sm text-gray-500">{forecast.temp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                day: 'Sun',
                temp: '34°',
                img: '/placeholder.svg?height=160&width=160',
              },
              {
                day: 'Mon',
                temp: '36°',
                img: '/placeholder.svg?height=160&width=160',
              },
            ].map((forecast) => (
              <div
                key={forecast.day}
                className="bg-white rounded-xl overflow-hidden"
              >
                <div className="h-40 bg-[#d1e0e5] relative">
                  <img
                    src={forecast.img || '/placeholder.svg'}
                    alt={`Weather for ${forecast.day}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{forecast.day}</h3>
                  <p className="text-sm text-gray-500">{forecast.temp}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-4">
          2023 Weatherly
        </footer>
      </div>
    </div>
  );
};

export default Home;
