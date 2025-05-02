import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryDetailPage = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then(res => setCountry(res.data[0]));
    }, [countryCode]);

    if (!country) return <div>Loading...</div>;

    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
    const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
    const borders = country.borders ? country.borders.join(", ") : "None";
    const idd = country.idd ? Object.values(country.idd).join("") : "N/A";
    const timezones = country.timezones ? country.timezones.join(", ") : "None";
    const continents = country.continents ? country.continents.join(", ") : "None";

    const coatOfArmsUrl = country.coatOfArms?.png;

    const googleMapsUrl = country.maps?.googleMaps;
    const openStreetMapsUrl = country.maps?.openStreetMaps;

    const openGoogleMaps = () => {
        if (googleMapsUrl) {
            window.open(googleMapsUrl, "_blank");
        }
    };

    const openOpenStreetMaps = () => {
        if (openStreetMapsUrl) {
            window.open(openStreetMapsUrl, "_blank");
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Country Header */}
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold mb-4">{country.name.common}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col bg-white p-4 rounded shadow-md space-y-2">
                        <div>
                            <img src={country.flags.png} alt="flag" className="max-h-[160px] mb-4" />
                        </div>
                        <div>
                            <p>Flag</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-white p-4 rounded shadow-md space-y-2">
                        <div className="min-h-[170px]">
                            {coatOfArmsUrl ? (
                                <img src={coatOfArmsUrl} alt="Coat of Arms" className="center max-h-[160px] mb-4" />
                            ) : (
                                <p>No coat of arms available</p>
                            )}
                        </div>
                        <div className="item-center">
                            <p>Coat of Arms</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Country Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country Info */}
                <div className="bg-white p-4 rounded shadow-md space-y-2">
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Sub Region:</strong> {country.subregion}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Area:</strong> {country.area} km<sup>2</sup></p>
                    <p><strong>Languages:</strong> {languages}</p>
                    <p><strong>Currencies:</strong> {currencies}</p>
                </div>

                {/* Additional Info */}
                <div className="bg-white p-4 rounded shadow-md space-y-2">
                    <p><strong>Borders:</strong> {borders}</p>
                    <p><strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
                    <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
                    <p><strong>IDD:</strong> {idd}</p>
                    <p><strong>Time Zones:</strong> {timezones}</p>
                    <p><strong>Continent:</strong> {continents}</p>
                    <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
                </div>
            </div>

            {/* Map Buttons */}
            <div className="mt-6 flex justify-center">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700"
                    onClick={openGoogleMaps}
                >
                    Open Google Maps
                </button>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    onClick={openOpenStreetMaps}
                >
                    Open OpenStreetMap
                </button>
            </div>
        </div>
    );
};

export default CountryDetailPage;
