import { fireEvent, render, screen } from "@testing-library/react"
import Navbar from "../components/Navbar"

test('button is not toggled when localstorage is empty', () => {
    localStorage.clear();
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    expect(toggleButton).not.toBeChecked();
})

test('button is toggled when localstorage has true value for theme', () => {
    localStorage.setItem('theme', 'true');
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    expect(toggleButton).toBeChecked();
})

test('button is not toggled when localstorage has false value for theme', () => {
    localStorage.setItem('theme', 'false');
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    expect(toggleButton).not.toBeChecked();
})

test('button is toggled when user click and localstorage is empty', () => {
    localStorage.clear();
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toBeChecked();
})

test('button is toggled when user click and button is already clicked', () => {
    localStorage.setItem('theme', 'true');
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    fireEvent.click(toggleButton);
    
    expect(toggleButton).not.toBeChecked();
})

test('button is toggled when user click and button is not toggled', () => {
    localStorage.setItem('theme', 'false');
    render(<Navbar />);

    const toggleButton = screen.getByRole('checkbox');
    fireEvent.click(toggleButton);
    
    expect(toggleButton).toBeChecked();
})