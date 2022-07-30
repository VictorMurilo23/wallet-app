import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, renderWithRedux } from './tests/helpers/renderWith';
import App from './App';
import Wallet from './pages/Wallet';

const userEmail = 'alguem@gmail.com';
const totalField = 'total-field';

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

  it('Verifica se o valor total é somado corretamente', async () => {
    renderWithRedux(<Wallet />);

    const expenseValue = await screen.findByLabelText(/Valor da despesa/i);
    expect(screen.getByTestId(totalField)).toHaveTextContent('0');
    userEvent.type(expenseValue, '22');

    const expenseDescription = screen.getByLabelText(/Descrição da despesa/i);
    userEvent.type(expenseDescription, 'Vinte e dois dolares');

    const button = screen.getByText(/Adicionar despesa/i);

    userEvent.click(button);

    const value = await screen.findAllByText('113.82');
    expect(value[0]).toBeDefined();
  });
});

describe('Testes Table', () => {
  it('Verifica se é criada uma tabela com os itens salvos', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseValue = await screen.findByLabelText(/Valor da despesa/i);
    userEvent.type(expenseValue, '500');

    const currencyComboBox = screen.getByLabelText(/Moeda/i);
    expect(currencyComboBox).toBeInTheDocument();
    userEvent.selectOptions(currencyComboBox, 'EUR');

    const expenseDescription = screen.getByLabelText(/Descrição da despesa/i);
    userEvent.type(expenseDescription, 'Quinhentos Euros');

    const button = screen.getByText(/Adicionar despesa/i);
    userEvent.click(button);

    const description = await screen.findByText('Quinhentos Euros');
    expect(description).toBeInTheDocument();
    const currency = screen.getByText('Euro/Real Brasileiro');
    expect(currency).toBeDefined();
  });

  it('Verifica se ao clicar no botão excluir o item é removido da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseValue = await screen.findByLabelText(/Valor da despesa/i);
    userEvent.type(expenseValue, '600');

    const currencyComboBox = screen.getByLabelText(/Moeda/i);
    expect(currencyComboBox).toBeInTheDocument();
    userEvent.selectOptions(currencyComboBox, 'BTC');

    const expenseDescription = screen.getByLabelText(/Descrição da despesa/i);
    userEvent.type(expenseDescription, 'Seiscentos Bitcoins');

    const button = screen.getByText(/Adicionar despesa/i);
    userEvent.click(button);

    const deleteExpenseButton = await screen.findByRole('button', { name: 'Excluir' });
    expect(deleteExpenseButton).toBeDefined();
    userEvent.click(deleteExpenseButton);

    expect(screen.queryByText('Seiscentos Bitcoins')).not.toBeInTheDocument();
  });

  it('Verifica se é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseValue = await screen.findByLabelText(/Valor da despesa/i);
    userEvent.type(expenseValue, '1000');

    const currencyComboBox = screen.getByLabelText(/Moeda/i);
    expect(currencyComboBox).toBeInTheDocument();
    userEvent.selectOptions(currencyComboBox, 'JPY');

    const expenseDescription = screen.getByLabelText(/Descrição da despesa/i);
    userEvent.type(expenseDescription, '1000 Ienes');

    const button = screen.getByText(/Adicionar despesa/i);
    userEvent.click(button);

    const editExpenseButton = await screen.findByRole('button', { name: 'Editar' });
    expect(editExpenseButton).toBeDefined();
    userEvent.click(editExpenseButton);

    userEvent.type(expenseValue, '3000');
    userEvent.type(expenseDescription, '3000 Ienes');
    const updatExpenseInfoButton = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(updatExpenseInfoButton);

    expect(await screen.findByText(/3000 ienes/i)).toBeDefined();
    expect(screen.getByText('3000.00')).toBeDefined();
  });
});
