import React from "react";

const TopCountryCard = ({ country }) => {
    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";

    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-100 p-4 rounded-md shadow">
            
            <img src={country.flags.png} alt="flag" className=" h-32 object-cover" />
            
            <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold mt-2">{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Languages: {languages}</p>
            <p>Area: {country.area} km<sup>2</sup></p>
            </div>
        </div>
    );
};
export default TopCountryCard;
