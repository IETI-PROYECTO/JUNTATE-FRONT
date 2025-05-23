import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FutbolScreen from '../screens/FutbolScreen';
import App from '../App';
import AddMatchForm from '../components/futbol/AddMatchForm';

// Mock para localStorage.getItem('token')
beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'token') return 'mock-token';
        return null;
    });
});

// Limpieza de mocks después de cada test
afterEach(() => {
    jest.restoreAllMocks();
    if (global.fetch && global.fetch.mockClear) global.fetch.mockClear();
});

describe('Restricción de acceso al perfil', () => {
    it('muestra la pantalla de selección de deportes si no hay sesión', () => {
        localStorage.removeItem('token');

        render(<App />);

        expect(screen.getByText(/elige tu\/s deporte\/s/i)).toBeInTheDocument();
        expect(screen.queryByText(/mi perfil/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/inicio de sesión/i)).not.toBeInTheDocument();
    });
});


describe('AddMatchForm', () => {
    const fillAndSubmitForm = () => {
        fireEvent.change(screen.getByLabelText(/Nombre del Partido/i), {
            target: { value: 'Partido Test' },
        });
        fireEvent.change(screen.getByLabelText(/Tipo de Partido/i), {
            target: { value: 'Futbol 7' },
        });
        fireEvent.change(screen.getByLabelText(/Lugar/i), {
            target: { value: 'Cancha Central' },
        });
        fireEvent.change(screen.getByLabelText(/Fecha de Expiración/i), {
            target: { value: '2030-12-31T10:00' },
        });
        fireEvent.change(screen.getByLabelText(/Número de Jugadores/i), {
            target: { value: '14' },
        });

        fireEvent.submit(screen.getByTestId('add-match-form'));
    };

    it('renderiza el formulario', () => {
        render(<AddMatchForm onAddMatch={() => {}} onCancel={() => {}} />);
        expect(screen.getByText(/Crear Nuevo Partido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre del Partido/i)).toBeInTheDocument();
    });

    it('muestra alerta si campos requeridos están vacíos', () => {
        global.alert = jest.fn();
        render(<AddMatchForm onAddMatch={() => {}} onCancel={() => {}} />);

        fireEvent.submit(screen.getByTestId('add-match-form'));
        expect(global.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
    });

    it('llama a onAddMatch si los datos son válidos', () => {
        const onAddMatchMock = jest.fn();
        render(<AddMatchForm onAddMatch={onAddMatchMock} onCancel={() => {}} />);

        fillAndSubmitForm();

        expect(onAddMatchMock).toHaveBeenCalledTimes(1);
        expect(onAddMatchMock.mock.calls[0][0]).toMatchObject({
            name: 'Partido Test',
            gameType: 'Futbol 7',
            location: 'Cancha Central',
            numberOfPlayers: 14,
        });
    });
});

describe('FutbolScreen', () => {
    const mockMatches = [
        {
            id: '1',
            name: 'Partido Amistoso',
            gameType: 'Futbol 7',
            location: 'Cancha Central',
            creationDate: '2025-05-01',
            numberOfPlayers: 14,
        },
    ];

    beforeEach(() => {
        // Mock global.fetch para evitar llamadas reales y devolver partidos falsos
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockMatches),
            })
        );
    });

    it('carga y muestra los partidos disponibles desde el backend', async () => {
        render(<FutbolScreen onNavigateBack={() => {}} onNavigate={() => {}} />);

        expect(screen.getByText(/Cargando partidos.../i)).toBeInTheDocument();

        // Espera a que cargue la lista
        await waitFor(() => {
            expect(screen.getByText(/Partido Amistoso/i)).toBeInTheDocument();
            expect(screen.getByText(/Cancha Central/i)).toBeInTheDocument();
        });
    });

    it('muestra mensaje de error si el backend falla', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
            })
        );

        render(<FutbolScreen onNavigateBack={() => {}} onNavigate={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText(/No se pudieron cargar los eventos./i)).toBeInTheDocument();
        });
    });

});
