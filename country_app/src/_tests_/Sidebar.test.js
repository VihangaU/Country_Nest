import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

describe('Sidebar', () => {
    test('highlights the active link', () => {
        render(
            <Router>
                <Sidebar />
            </Router>
        );

        const dashboardLink = screen.getByText('Dashboard');
        const countryListLink = screen.getByText('Country List');
        const favoritesLink = screen.getByText('Favorites');

        // Simulate navigation by manually adding active class (simulating React Router behavior)
        expect(dashboardLink).toHaveClass('bg-blue-700');
        expect(countryListLink).not.toHaveClass('bg-blue-700');
        expect(favoritesLink).not.toHaveClass('bg-blue-700');
    });
});
