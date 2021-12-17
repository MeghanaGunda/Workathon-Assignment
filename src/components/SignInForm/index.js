import './index.css'
import {FiFacebook, FiTwitter, FiGithub} from 'react-icons/fi'
import {Component} from 'react'

class SignInForm extends Component {
  state = {
    errorMsg: '',
    showSubmitError: false,
    username: '',
    password: '',
    registered: false,
    fullname: '',
    email: '',
    tAndCChecked: '',
    company: '',
  }

  onSubmitSuccess = props => {
    const {history} = this.props
    this.setState({email: '', password: ''})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onClickSubmitSignIn = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {user_email: email, user_password: password}
    const url = 'https://snapkaro.com/eazyrooms_staging/api/userlogin'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.msg === 'User found') {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.msg)
    }
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickSignup = props => {
    const {history} = this.props
    history.replace('/login')
    // this.setState({registered: false})
  }

  onChangeRememberMe = event => {
    this.setState({checked: event.target.isChecked})
  }

  renderSignInSection = () => {
    const {
      username,
      password,
      checked,
      showSubmitError,
      errorMsg,
      email,
    } = this.state
    return (
      <form className="signin-form" onSubmit={this.onClickSubmitSignIn}>
        <h1 className="signin-heading">Sign In</h1>
        <p className="signin-text">
          Don't have an account?{' '}
          <span>
            <button className="signin-option" onClick={this.onClickSignup}>
              Sign up
            </button>
          </span>
        </p>
        <div className="label-input">
          <label className="username-title label" htmlFor="username-input">
            Email address*
          </label>
          <input
            id="username-input"
            type="text"
            className="input-box"
            value={email}
            onChange={this.onChangeEmail}
          />
        </div>
        <div className="label-input">
          <label className="username-title label" htmlFor="password-input">
            Password*
          </label>
          <input
            id="password-input"
            type="password"
            className="input-box"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
        <div className="rem-forgot-section">
          <div className="remember-section">
            <input
              type="checkbox"
              value={checked}
              onChange={this.onChangeRememberMe}
            />
            <p className="remember-text">Remember me</p>
          </div>
          <div className="forgot-section">
            <p className="forgot-text">Forgot Password?</p>
          </div>
        </div>
        <button type="submit" className="signin-button">
          SignIn
        </button>
        {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        <p className="continue-text">Or continue with</p>
        <div className="icons-section">
          <FiFacebook className="icon" />
          <FiTwitter className="icon" />
          <FiGithub className="icon" />
        </div>
      </form>
    )
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="bg-container">
        <div className="website-container">
          <div className="welcome-section">
            <img src="https://i.postimg.cc/zDwZtY69/Group-7258.png" />
            <h1 className="welcome-heading">Welcome to our community</h1>
            <p className="welcome-text">
              Fuse helps developers to build organised and well coded dashboards
              full with beautiful and rich modules. Join us and start building
              your application today.
            </p>
          </div>
          <div className="signup-section">
            <img
              src="https://i.postimg.cc/C1nnDTHK/logo.jpg"
              className="website-logo"
            />
            {this.renderSignInSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default SignInForm
