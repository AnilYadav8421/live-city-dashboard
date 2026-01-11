import { useEffect, useState } from "react";
import { getAllCountries } from "../services/countryService";
import CountryCard from "../components/country/CountryCard";
import Loader from "../components/common/Loader";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Countries Explorer
          </h2>
          <p className="text-sm text-gray-500">
            Search and explore country details worldwide
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search country by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Empty state */}
        {filteredCountries.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No countries found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.cca3}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <CountryCard country={country} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Countries;
