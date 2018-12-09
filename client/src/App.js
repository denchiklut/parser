import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Customers from "./components/customers/customers"
import Button from "@material-ui/core/Button/Button"

class App extends Component {
   state = {
       isStart: false,
       log: null,
   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Button
                variant="outlined"
                size="large"
                color="secondary"
                onClick={() => this.handleClick()}>
                {this.state.isStart ? 'Stop' : 'Start'}
            </Button>
            {this.state.log ? this.state.log: ''}
            <Customers/>
        </header>
      </div>
    )
  }

  handleClick = () => {
       this.setState({
           isStart: !this.state.isStart
       })
      axios
          .post(`/api/parser`, {status: this.state.isStart ? 'stop' : 'start'})
          .then(res => {
              let log = res.data.msg
              this.setState({log})
          })
    }
}

export default App;
