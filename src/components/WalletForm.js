import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchangeRates } from '../redux/actions';
import Loading from './Loading';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: this.alimentacao,
    };

    this.alimentacao = 'Alimentação'; // Só fiz isso pq o linter me obrigou.
  }

  componentDidMount() {
    const { saveCurrencies } = this.props;
    saveCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  saveInfo = () => {
    const { expenses, saveExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const obj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    saveExpense(obj);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { currencies, loading } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <form>
          <label htmlFor="expenseValue">
            Valor da despesa:
            <input
              id="expenseValue"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="expenseCategory">
            Moeda:
            <select
              id="expenseCategory"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {
                currencies.map((currencie) => (
                  <option value={ currencie } key={ currencie }>
                    {currencie}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              id="paymentMethod"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>

          <label htmlFor="expenseCategory">
            Categoria:
            <select
              id="expenseCategory"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value={ this.alimentacao }>
                {this.alimentacao}
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>

          <label htmlFor="expenseDescription">
            Descrição da despesa:
            <input
              id="expenseDescription"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>

          <button type="button" onClick={ this.saveInfo }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  saveCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (obj) => dispatch(fetchExchangeRates(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
