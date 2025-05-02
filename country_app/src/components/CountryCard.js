import React from "react";

const CountryCard = ({ country, isFavorite, onFavoriteToggle }) => {
    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";

    return (
        <div className="p-4 border rounded shadow cursor-pointer background-color bg-gray-200 max-h-full">
            <img src={country.flags.png} alt="flag" className="w-full h-32 object-cover" />
            <h2 className="text-xl font-bold mt-2">{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Languages: {languages}</p>
        </div>
    );
};
export default CountryCard;
