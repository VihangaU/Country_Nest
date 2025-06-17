import React, { useEffect, useState } from "react";
import axios from "axios";
import TopCountryCard from "../components/TopCountryCard";

const DashboardPage = () => {
    const [countries, setCountries] = useState([]);
    const [topPopCountries, setTopPopCountries] = useState([]);
    const [topAreaCountries, setTopAreaCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name,population,area,flags,capital,region,languages,cca3")
            .then((res) => {
                setCountries(res.data);
                setLoading(false);

                const sortedByPop = [...res.data].sort((a, b) => b.population - a.population).slice(0, 10);
                const sortedByArea = [...res.data].sort((a, b) => b.area - a.area).slice(0, 10);

                setTopPopCountries(sortedByPop);
                setTopAreaCountries(sortedByArea);
            })
            .catch((error) => {
                console.error("Error fetching countries data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20">Loading...</div>;

    const totalCountries = countries.length;
    const highestPopCountry = countries.reduce((max, c) => c.population > max.population ? c : max, countries[0]);
    const highestAreaCountry = countries.reduce((max, c) => c.area > max.area ? c : max, countries[0]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-12">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                    {
                        title: "Total Countries",
                        value: totalCountries
                    },
                    {
                        title: "Highest Population",
                        value: `${highestPopCountry?.name.common}`,
                        extra: `${highestPopCountry?.population.toLocaleString()}`
                    },
                    {
                        title: "Highest Area",
                        value: `${highestAreaCountry?.name.common}`,
                        extra: `${highestAreaCountry?.area.toLocaleString()} km²`
                    }
                ].map((card, i) => (
                    <div key={i} className="p-6 rounded-lg shadow-md text-center bg-[#BCCCDC]">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-base sm:text-lg font-medium">{card.value}</p>
                        {card.extra && <p className="text-sm sm:text-base text-gray-700">{card.extra}</p>}
                    </div>
                ))}
            </div>

            {/* Top Countries Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Population */}
                <div className="bg-white p-4 sm:p-6 rounded shadow-md">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Top 10 Highest Population Countries</h3>
                    {topPopCountries.map((country) => (
                        <div key={country.cca3} className="mb-2">
                            <TopCountryCard country={country} />
                        </div>
                    ))}
                </div>

                {/* Area */}
                <div className="bg-white p-4 sm:p-6 rounded shadow-md">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Top 10 Highest Area Countries</h3>
                    {topAreaCountries.map((country) => (
                        <div key={country.cca3} className="mb-2">
                            <TopCountryCard country={country} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
