// src/components/country/CountryCard.jsx
const CountryCard = ({ country }) => {
  return (
    <div className="flex flex-col h-full">

      {/* Flag */}
      <div className="w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h3 className="text-[17px] font-semibold tracking-tight text-gray-900 leading-snug">
          {country.name.common}
        </h3>

        <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">
          {country.region}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Population</span>
            <span className="font-medium text-gray-800">
              {country.population.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Country Code</span>
            <span className="font-medium text-gray-800">
              {country.cca3}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
