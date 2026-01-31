import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { login } from '../services/auth-service';

// Mock auth-service und useNavigate
jest.mock('../services/auth-service');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rendert Login-Form korrekt', () => {
    renderWithRouter(<Login />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-Mail oder Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('erfolgreiches Login navigiert weiter', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    login.mockResolvedValue({ token: 'fake-token', username: 'admin' });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-Mail oder Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Passwort'), {
      target: { value: 'admin123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin', 'admin123');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('zeigt Fehler bei falschen Credentials', async () => {
    login.mockRejectedValue(new Error('Falsche Zugangsdaten'));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('E-Mail oder Username'), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByPlaceholderText('Passwort'), {
      target: { value: 'wrong' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Falsche Zugangsdaten')).toBeInTheDocument();
    });
  });
});