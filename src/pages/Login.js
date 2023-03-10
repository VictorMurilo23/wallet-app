import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmailAction } from '../redux/actions';
import wallet from '../images/wallet.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, type } = target;
    this.setState({
      [type]: value,
    }, () => {
      if (this.validateEmail() === true && this.validatePassword() === true) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  }

  validateEmail = () => {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  validatePassword = () => {
    const { password } = this.state;
    const minLength = 6;
    return password.length >= minLength;
  }

  render() {
    const { email, password, disabled } = this.state;
    const { saveEmail } = this.props;
    return (
      <main className="login-container">
        <div className="login-inputs-container">
          <div className="login-wallet-image-container">
            <img src={ wallet } alt="Imagem de uma carteira" />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              className="login-input"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </div>
          <div>
            <button
              type="button"
              disabled={ disabled }
              className="enter-login-button"
              onClick={ () => {
                saveEmail(email);
                const { history } = this.props;
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          </div>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
