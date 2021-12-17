import {Switch, Route} from 'react-router-dom'
import './App.css'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={SignUpForm} />
    <Route exact path="/signin" component={SignInForm} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
