import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CountryCard from "../components/CountryCard"; // Assuming you have the CountryCard component
import config from "../config/config";

const FavoritesPage = () => {
    const [countriesDetails, setCountriesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [hasNavigated, setHasNavigated] = useState(false);  // Flag to prevent multiple alerts

    const navigate = useNavigate();

    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        if (!token || !userId) {
            if (!hasNavigated) {
                alert("Please log in to view your favorite countries.");
                setHasNavigated(true);  // Set flag to prevent further alerts
                navigate("/login");
            }
        } else {
            // Fetch the list of favorite country codes
            axios.get(`${config.API_BASE_URL}/api/get/${userId}/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                const favoriteCountryCodes = response.data; // Array of country codes (e.g., ["US", "IN", "GB"])

                // Fetch details of each favorite country using the Rest Countries API
                const countryRequests = favoriteCountryCodes.map((countryCode) =>
                    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                );

                // Wait for all country details to be fetched
                Promise.all(countryRequests)
                    .then((results) => {
                        const countryDetails = results.map((res) => res.data[0]);
                        setCountriesDetails(countryDetails);
                        setFavorites(favoriteCountryCodes); // Store the favorite country codes
                        setLoading(false); // Data is loaded, set loading to false
                    })
                    .catch((err) => {
                        console.error("Error fetching country details:", err);
                        setLoading(false);
                    });
            }).catch((err) => {
                console.error("Error fetching favorites:", err);
                setLoading(false);
            });
        }
    }, [token, userId, hasNavigated, navigate]);  // Include hasNavigated to track navigation state

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
            // Remove country from favorites list in state
            const updatedFavorites = favorites.filter((code) => code !== countryCode);
            setFavorites(updatedFavorites);

            // Remove the country from the displayed list of favorite countries
            const updatedCountriesDetails = countriesDetails.filter((country) => country.cca3 !== countryCode);
            setCountriesDetails(updatedCountriesDetails);
        }).catch(error => {
            console.error("Error removing favorite country:", error);
        });
    };

    if (loading) {
        return <div>Loading your favorite countries...</div>; // Show loading indicator
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Your Favorite Countries</h2>

            {/* Display message if no favorite countries */}
            {countriesDetails.length === 0 ? (
                <p className="text-center text-lg text-gray-500">You have no favorite countries. Start adding some!</p>
            ) : (
                // Display favorite countries
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {countriesDetails.map((country) => (
                        <div key={country.cca3} className="relative">
                            <Link to={`/country/${country.cca3}`}>
                                <CountryCard country={country}
                                    isFavorite={favorites.includes(country.cca3)}
                                    onFavoriteToggle={() =>
                                        favorites.includes(country.cca3)
                                            ? handleRemoveFavorite(country.cca3)
                                            : handleAddFavorite(country.cca3)
                                    }
                                />
                            </Link>

                            {/* Remove Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation from being triggered by the button click
                                    handleRemoveFavorite(country.cca3);
                                }}
                                className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
