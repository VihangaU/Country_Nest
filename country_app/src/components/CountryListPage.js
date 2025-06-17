import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard"; // Assuming you have the CountryCard component
import config from "../config/config";

const CountryListPage = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({
        region: "",
        subregion: "",
        language: "",
        minPopulation: 0,
        maxPopulation: 1500000000,
        minArea: 0,
        maxArea: 17100000,
    });

    const navigate = useNavigate();

    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        // Fetch country data
        axios.get("https://restcountries.com/v3.1/all?fields=name,population,area,flags,capital,region,languages,cca3,subregion")
            .then((res) => {
                setCountries(res.data);
                setFilteredCountries(res.data); // Initialize filtered countries
            });

        // Fetch user's favorite countries if logged in
        if (token && userId) {
            axios.get(`${config.API_BASE_URL}/api/get/${userId}/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => setFavorites(res.data));
        }
    }, [token, userId]);

    const handleAddFavorite = (countryCode) => {
        if (!token) {
            alert("Please log in to add favorites.");
            navigate("/login");
            return;
        }

        // Send the country code wrapped in an object
        axios.post(`${config.API_BASE_URL}/api/post/${userId}/favorites`, { country: countryCode }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            setFavorites([...favorites, countryCode]);
        }).catch(error => {
            console.error("Error adding favorite country:", error);
        });
    };

    const handleRemoveFavorite = (countryCode) => {
        if (!token) {
            alert("Please log in to remove favorites.");
            return;
        }

        // Send the country code wrapped in an object
        axios.put(`${config.API_BASE_URL}/api/put/${userId}/favorites`, { country: countryCode }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            setFavorites(favorites.filter((code) => code !== countryCode));
        }).catch(error => {
            console.error("Error removing favorite country:", error);
        });
    };

    // Handle changes in filter options
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Apply filters to countries
    const applyFilters = useCallback(() => {
        let filtered = countries.filter((country) => {
            const matchesRegion = filters.region ? country.region === filters.region : true;
            const matchesSubregion = filters.subregion ? country.subregion === filters.subregion : true;
            const matchesLanguage = filters.language ? Object.values(country.languages || {}).includes(filters.language) : true;
            const matchesPopulation = country.population >= filters.minPopulation && country.population <= filters.maxPopulation;
            const matchesArea = country.area >= filters.minArea && country.area <= filters.maxArea;

            return matchesRegion && matchesSubregion && matchesLanguage && matchesPopulation && matchesArea;
        });

        // Also apply search filter
        if (search) {
            filtered = filtered.filter((country) =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredCountries(filtered);
    }, [countries, filters, search]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]); // Reapply filters whenever filters or search changes

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Bar */}
                <div className="mb-2 pt-4">
                    <label className="font-bold mr-2">Enter country name for search:</label>
                    <input
                        className="p-2 border border-black rounded w-full"
                        placeholder="Search countries..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Advanced Filters */}
                <div className="mb-2 pt-4">
                    <label className="font-bold mr-2">Region:</label>
                    <select
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                        className="p-2 border border-black rounded w-full"
                    >
                        <option value="">All Regions</option>
                        {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="font-bold mr-2">Language:</label>
                    <select
                        name="language"
                        value={filters.language}
                        onChange={handleFilterChange}
                        className="p-2 border border-black rounded w-full"
                    >
                        <option value="">All Languages</option>
                        {["English", "Spanish", "French", "Arabic", "Russian"].map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="font-bold mr-2">Subregion:</label>
                    <select
                        name="subregion"
                        value={filters.subregion}
                        onChange={handleFilterChange}
                        className="p-2 border border-black rounded w-full"
                    >
                        <option value="">All Subregions</option>
                        {["Southern Asia", "Eastern Europe", "Western Europe", "Central Africa"].map((subregion) => (
                            <option key={subregion} value={subregion}>
                                {subregion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Population Filter */}
                <div className="mb-4">
                    <label className="font-bold mr-2">Population Range:</label>
                    <div>
                        <label>Min Population: {filters.minPopulation}</label>
                        <input
                            type="range"
                            name="minPopulation"
                            min="0"
                            max="1500000000"
                            value={filters.minPopulation}
                            onChange={handleFilterChange}
                            className="p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Max Population: {filters.maxPopulation}</label>
                        <input
                            type="range"
                            name="maxPopulation"
                            min="0"
                            max="1500000000"
                            value={filters.maxPopulation}
                            onChange={handleFilterChange}
                            className="p-2 w-full"
                        />
                    </div>
                </div>

                {/* Area Filter */}
                <div className="mb-4">
                    <label className="font-bold mr-2">Area Range (sq km):</label>
                    <div>
                        <label>Min Area: {filters.minArea} km²</label>
                        <input
                            type="range"
                            name="minArea"
                            min="0"
                            max="17100000"
                            value={filters.minArea}
                            onChange={handleFilterChange}
                            className="p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Max Area: {filters.maxArea} km²</label>
                        <input
                            type="range"
                            name="maxArea"
                            min="0"
                            max="17100000"
                            value={filters.maxArea}
                            onChange={handleFilterChange}
                            className="p-2 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Country Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <div key={country.cca3} className="relative">
                            {/* Country link for navigation */}
                            <Link to={`/country/${country.cca3}`}>
                                <CountryCard country={country} isFavorite={favorites.includes(country.cca3)} />
                            </Link>

                            {/* Button for adding/removing from favorites */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop the event from propagating to the Link
                                    favorites.includes(country.cca3)
                                        ? handleRemoveFavorite(country.cca3)
                                        : handleAddFavorite(country.cca3);
                                }}
                                className={`relative bottom-2 ${favorites.includes(country.cca3) ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 rounded`}
                            >
                                {favorites.includes(country.cca3) ? "Remove from Favorites" : "Add to Favorites"}
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No countries found with the applied filters</div>
                )}
            </div>
        </div>
    );
};

export default CountryListPage;
