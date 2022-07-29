import getCurrencies from '../../services/currenciesApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const saveCurrenciesAction = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const SAVE_EXCHANGE_RATES = 'SAVE_EXCHANGE_RATES';
export const saveExchangeRatesAction = (currencies, obj) => ({
  type: SAVE_EXCHANGE_RATES,
  expense: { ...obj, exchangeRates: currencies },
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await getCurrencies();
  dispatch(saveCurrenciesAction(Object.keys(response)
    .filter((element) => element !== 'USDT')));
};

export const fetchExchangeRates = (obj) => async (dispatch) => {
  const response = await getCurrencies();
  dispatch(saveExchangeRatesAction(response, obj));
};

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const removeExpenseAction = (expenses) => ({
  type: REMOVE_EXPENSE,
  expenses,
});
