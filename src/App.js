import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import { About } from './components/pages/About'
import User from './components/layout/users/User'
import GithubState from './components/context/github/GithubState'
import AlertState from './components/context/alert/AlertState'
import { Home } from './components/pages/Home'
import Alert from './components/layout/Alert'
import { Notfound } from './components/pages/Notfound'

const App =()=>{
 
    return (
      <GithubState>
        <AlertState>
        <Router >
          <div className='App'>
            <Navbar/>
            <div className="container">
              <Alert/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login'component={User}/>
                <Route component={Notfound} />
              </Switch> 

            </div>
          </div>
        </Router>
        </AlertState>
      </GithubState>
    )
  }

export default App;