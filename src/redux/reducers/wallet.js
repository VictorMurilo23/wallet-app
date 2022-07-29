import { REMOVE_EXPENSE,
  SAVE_CURRENCIES, SAVE_EXCHANGE_RATES, EDIT_EXPENSE, UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      loading: false,
    };
  case SAVE_EXCHANGE_RATES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.id,
      editor: action.editor,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
