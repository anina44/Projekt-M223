import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import api from '../services/api-client';
import { AuthContext } from '../auth/AuthContext';

// Mock API und AuthContext
jest.mock('../services/api-client');
jest.mock('../auth/AuthContext');

describe('Home Component', () => {
  beforeEach(() => {
    // Mock AuthContext mit User
    AuthContext.mockReturnValue({
      user: { id: 1, username: 'testuser' }
    });
  });

  test('lädt und zeigt Reiseziele an', async () => {
    // Mock API-Response
    const mockData = [
      { id: 1, ort: 'Paris', jahr: '2023', highlights: 'Eiffelturm' },
      { id: 2, ort: 'Berlin', jahr: '2024', highlights: 'Brandenburger Tor' }
    ];
    api.get.mockResolvedValue({ data: mockData });

    render(<Home />);

    // Warte auf Laden und prüfe Anzeige
    await waitFor(() => {
      expect(screen.getByText('Meine Reisen:')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('Berlin')).toBeInTheDocument();
    });

    // Prüfe API-Aufruf
    expect(api.get).toHaveBeenCalledWith('/api/reiseziele');
  });

  test('zeigt Nachricht bei keinen Reisezielen', async () => {
    // Mock leere Response
    api.get.mockResolvedValue({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Keine Reiseziele vorhanden. Füge eines hinzu!')).toBeInTheDocument();
    });
  });
});