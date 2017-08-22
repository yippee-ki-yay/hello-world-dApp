import React, { Component } from 'react'
import HelloWorldContract from '../build/contracts/HelloWorld.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      msg: '',
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() { 

    const contract = require('truffle-contract')
    const helloWorld = contract(HelloWorldContract)
    helloWorld.setProvider(this.state.web3.currentProvider)

    const eth = this.state.web3.eth;

    const instance = await helloWorld.deployed();

    const msg = await instance.sayHi.call(eth.accounts[0]);

    this.setState({
      msg
    });

  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Hello world and the blockchain</h2>
      
              <p>We have read from the blockchain at is says: <b> {this.state.msg} </b> </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
