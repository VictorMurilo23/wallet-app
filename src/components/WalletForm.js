import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';
import Loading from './Loading';

class WalletForm extends Component {
  componentDidMount() {
    const { saveCurrencies } = this.props;
    saveCurrencies();
  }

  render() {
    const { currencies, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <form>
          <label htmlFor="expenseValue">
            Valor da despesa:
            <input id="expenseValue" type="number" data-testid="value-input" />
          </label>

          <label htmlFor="expenseDescription">
            Descrição da despesa:
            <input id="expenseDescription" type="text" data-testid="description-input" />
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select id="paymentMethod" data-testid="method-input">
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
            <select id="expenseCategory" data-testid="tag-input">
              <option value="Alimentação">
                Alimentação
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

          <label htmlFor="expenseCategory">
            Moeda:
            <select id="expenseCategory" data-testid="currency-input">
              {
                currencies.map((currencie) => (
                  <option value={ currencie } key={ currencie }>
                    {currencie}
                  </option>
                ))
              }
            </select>
          </label>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  saveCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
