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

export const fetchCurrencies = () => async (dispatch) => {
  const response = await getCurrencies();
  dispatch(saveCurrenciesAction(Object.keys(response)
    .filter((element) => element !== 'USDT')));
};
