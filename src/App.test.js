import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, renderWithRedux } from './tests/helpers/renderWith';
import App from './App';
import Wallet from './pages/Wallet';

const userEmail = 'alguem@gmail.com';

describe('Teste Login', () => {
  it('Testa se a tela de login renderiza as informações corretas', () => {
    renderWithRouterAndRedux(<App />);
    const loginInput = screen.getByPlaceholderText('Email');
    expect(loginInput).toBeDefined();
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeDefined();
    const buttonEntrar = screen.getByText('Entrar');
    expect(buttonEntrar).toBeDefined();
  });

  it('Testa se o botão só é habilitado se tiver uma senha ou email válido', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button.disabled).toBe(true);

    const loginInput = screen.getByPlaceholderText('Email');
    userEvent.type(loginInput, userEmail);
    expect(button.disabled).toBe(true);

    const passwordInput = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInput, '1234567');
    expect(button.disabled).toBe(false);
  });

  it('Testa se ao clicar no botão de entrar eu sou redirecionado pra "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginInput = screen.getByPlaceholderText('Email');
    userEvent.type(loginInput, userEmail);

    const passwordInput = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInput, '1234567');

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testes Header', () => {
  it('Verifica se o email do usuario aparece no Header', () => {
    const initialState = {
      user: {
        email: userEmail,
      },
    };
    renderWithRedux(<Wallet />, { initialState });

    const email = screen.getByText(userEmail);
    expect(email).toBeDefined();
  });
});
