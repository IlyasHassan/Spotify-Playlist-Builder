import MainPage from "./MainPage"
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import React, {Component} from 'react'
import LogInPage from "./LogInPage"
import NavBar from "./NavBar"
import SignUpPage from "./SignUpPage"
import Dashboard from "./Dashboard"
function App() {

  return (
    <BrowserRouter>
    <div className="App">
    <NavBar></NavBar>


      <Switch>
        <Route path="/Build-Playlist" component={MainPage}/>
        <Route path="/LogIn" component={LogInPage}/>
        <Route path="/SignUp" component={SignUpPage}/>
        <Route exact path="/" component={Dashboard}/>
        
      


      </Switch>
    </div>
    </BrowserRouter>
  );
  }

export default App;