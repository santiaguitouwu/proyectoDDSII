import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from "../pages/Login/Login";

import { vi } from 'vitest';

describe('Login Component', () => {
  test('calls handleLogin when both email and password are provided', () => {
    render(<Login />);

  
    const emailInput = screen.getByPlaceholderText(/ingrese su correo/i);
    const passwordInput = screen.getByPlaceholderText(/ingrese su contraseña/i);
    const submitButton = screen.getByText(/ingresar/i);

    // Simula la interacción
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

  });

  test('shows an alert when fields are empty', () => {
    render(<Login />);


    const submitButton = screen.getByText(/ingresar/i);

    
    fireEvent.click(submitButton);

    
  });
});