import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  removeElement = (shouldBeRemovedId) => {
    const { expenses, removeExpense } = this.props;
    const filteredExpenses = expenses
      .filter((expense) => expense.id !== shouldBeRemovedId);
    removeExpense(filteredExpenses);
  }

  render() {
    const { expenses, editExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>
                    {
                      Number(expense.value)
                        .toFixed(2)
                    }
                  </td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {
                      Number(expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (expense.value * expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => this.removeElement(expense.id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      onClick={ () => editExpense(expense.id) }
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (array) => dispatch(removeExpenseAction(array)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
