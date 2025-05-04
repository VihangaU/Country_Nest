import { TextEncoder, TextDecoder } from "util";
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mocking console.error to suppress known errors (like network errors)
beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg) => {
        if (
            msg?.includes("Network Error") ||
            msg?.includes("404 Not Found")
        ) return; // Suppress known expected errors
        console.warn("Unexpected console.error:", msg); // Optional: warn for unknown
    });
});

afterAll(() => {
    console.error.mockRestore();
});