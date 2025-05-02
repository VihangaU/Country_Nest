import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesPage from '../components/FavoritesPage';
import axios from 'axios';

jest.mock('axios');

describe('FavoritesPage', () => {
    const mockFavorites = ['US', 'IN'];

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: mockFavorites
        });
        axios.post.mockResolvedValue({ data: {} });
        axios.put.mockResolvedValue({ data: {} });
    });

    test('renders favorite countries and handles add/remove favorite', async () => {
        render(<FavoritesPage />);

        // Wait for the countries to load
        const usCountry = await screen.findByText('United States');
        const indiaCountry = await screen.findByText('India');

        expect(usCountry).toBeInTheDocument();
        expect(indiaCountry).toBeInTheDocument();

        // Simulate removing a favorite
        const removeButton = screen.getAllByText('Remove')[0];
        fireEvent.click(removeButton);

        // Check if the country is removed from the favorites
        expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:8091/api/put/680723b0bb47220379e11c44/favorites',
            { country: 'US' },
            expect.anything()
        );
        expect(axios.put).toHaveBeenCalledTimes(1);

        // Check that the removed country is no longer displayed
        expect(screen.queryByText('United States')).not.toBeInTheDocument();
    });
});
