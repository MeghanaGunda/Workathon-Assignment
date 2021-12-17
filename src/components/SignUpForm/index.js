import {Component} from 'react'
import Cookies from 'js-cookie'
import {FiFacebook, FiTwitter, FiGithub} from 'react-icons/fi'
import './index.css'

class SignUpForm extends Component {
  state = {
    errorMsg: '',
    showSubmitError: false,
    username: '',
    password: '',
    checked: 'checked',
    registered: false,
    fullname: '',
    email: '',
    tAndCChecked: '',
    company: '',
  }

  onSubmitSignUpSuccess = props => {
    const {history} = this.props
    this.setState({
      username: '',
      password: '',
      company: '',
      fullname: '',
    })

    history.replace('/signin')
  }

  onSubmitSignUpFailure = errorMsg => {
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
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSignUp = async event => {
    event.preventDefault()
    const {fullname, email, password} = this.state
    const userDetails = {
      user_firstname: fullname,
      user_email: email,
      user_password: password,
      user_phone: '123456',
      user_lastname: '',
      user_city: 'Hyd',
      user_zipcode: '500084',
    }
    const url = 'https://snapkaro.com/eazyrooms_staging/api/user_registeration'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const registeredResponse = await fetch(url, options)
    const registeredData = await registeredResponse.json()
    console.log(registeredResponse)
    console.log(registeredData)
    if (registeredResponse.ok === true) {
      this.onSubmitSignUpSuccess()
    } else {
      this.onSubmitSignUpFailure(registeredData.msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangeFullname = event => {
    this.setState({fullname: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCompany = event => {
    this.setState({company: event.target.value})
  }

  onClickSignin = props => {
    const {history} = this.props
    history.replace('/login')
  }

  onChangeTandC = event => {
    this.setState({tAndCChecked: event.target.isChecked})
  }

  renderSignUpSection = () => {
    const {
      fullname,
      email,
      password,
      showSignInError,
      errorMsg,
      company,
      tAndCChecked,
    } = this.state
    return (
      <form className="signin-section" onSubmit={this.onSubmitSignUp}>
        <h1 className="signin-heading">Sign Up</h1>
        <p className="signin-text">
          Already have an account?{' '}
          <span>
            <button className="signin-option" onClick={this.onClickSignin}>
              Sign in
            </button>
          </span>
        </p>
        <div className="label-input">
          <label className="fullname-title label" htmlFor="fullname-input">
            Fullname*
          </label>
          <input
            id="fullname-input"
            type="text"
            className="input-box"
            value={fullname}
            onChange={this.onChangeFullname}
          />
        </div>
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
        <div className="label-input">
          <label className="company-title label" htmlFor="company-input">
            Company
          </label>
          <input
            id="company-input"
            type="text"
            className="input-box"
            value={company}
            onChange={this.onChangeCompany}
          />
        </div>
        <button type="submit" className="signin-button">
          Create your free account
        </button>
        {showSignInError && <p className="error-msg">*{errorMsg}</p>}
        <div className="terms-section">
          <input
            type="checkbox"
            value={tAndCChecked}
            onChange={this.onChangeTandC}
          />
          <p className="terms-text">
            I agree to the{' '}
            <span className="highlight-text">Terms of Services</span> and{' '}
            <span className="highlight-text">Privacy Policy</span>
          </p>
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
            {this.renderSignUpSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpForm
