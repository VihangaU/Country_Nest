import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryListPage from '../components/CountryListPage';
import axios from 'axios';

jest.mock('axios');

describe('CountryListPage', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { cca3: 'US', name: { common: 'United States' } },
                { cca3: 'IN', name: { common: 'India' } },
            ]
        });
    });

    test('renders country list and allows searching', async () => {
        render(<CountryListPage />);

        // Wait for data to be loaded
        const usCountry = await screen.findByText('United States');
        const indiaCountry = await screen.findByText('India');

        expect(usCountry).toBeInTheDocument();
        expect(indiaCountry).toBeInTheDocument();

        // Simulate a search input
        const searchInput = screen.getByPlaceholderText('Search countries...');
        fireEvent.change(searchInput, { target: { value: 'India' } });

        // Check if only the filtered country is shown
        expect(usCountry).not.toBeInTheDocument();
        expect(indiaCountry).toBeInTheDocument();
    });
});
