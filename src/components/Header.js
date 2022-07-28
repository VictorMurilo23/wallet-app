import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p>
          Valor total:
          {' '}
          <span data-testid="total-field">
            {
              expenses.reduce((acc, cur) => {
                const brlMoney = Number(cur.value * cur.exchangeRates[cur.currency].ask);
                acc += brlMoney;
                return Number(acc);
              }, 0).toFixed(2)
            }
          </span>

          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
