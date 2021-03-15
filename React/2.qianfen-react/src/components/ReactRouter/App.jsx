import React, { Component } from 'react'
import { Link,Redirect,Route,Switch, useHistory, useLocation } from "react-router-dom";


const fakeAuth = {
  isAuthenticated:false,
  login(cb){
    fakeAuth.isAuthenticated = true
    setTimeout(cb,100)
  },
  logout(cb){
    fakeAuth.isAuthenticated = false
    setTimeout(cb,100)
  }
}

const Home = () => <div>home</div>
const Login = () => {
  const {state: {from}} = useLocation()
  console.log(useLocation());
  const {replace} = useHistory()
  const login = () =>{
    fakeAuth.login(()=>{
      replace(from)
    })
  }
  return (
    <>
    <div> you must be login in to view the page at {from}</div>
    <button onClick={login}>login in</button>
    </>
  )
}
const Profile = () => <div>profile</div>
const ShowStatus = () => {
  const history = useHistory()
  return (
    <>
    {
      fakeAuth.isAuthenticated?
      <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.logout(() => history.push("/home"));
        }}
      >
        Sign out
      </button>
    </p>
    :<p>you are not login</p>
    }
    </>
    
  )
}

const PrivateRoute = ({children,...rest}) => {
  // console.log(children);
  const {pathname} = useLocation()
  return (
    <Route {...rest}>
      {
        fakeAuth.isAuthenticated?children:<Redirect to={{
          pathname:"/login",
          state:{from:pathname}
        }}></Redirect>
      }
    </Route>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/home'>home</Link></li>
          <li><Link to='/profile'>profile</Link></li>
        </ul>

        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/profile">
          <ShowStatus></ShowStatus>
          <Profile></Profile>
        </PrivateRoute>
        <Redirect from="/" to="/home"></Redirect>
      </div>
    )
  }
}
