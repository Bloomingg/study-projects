import React, { Component } from 'react'

export default class Input extends Component {
  state = {
    inputText: ""
  }
  inputChange = () => {
    return (e) => {
      // console.log(e.target.value);
      this.setState({
        inputText: e.target.value
      })
    }
  }
  getKeyUp = () => {
    return (e) => {
      if (e.keyCode === 13) {
        this.props.onSaveTodo(this.state.inputText)
        this.setState({
          inputText: ""
        })
      }
    }
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.inputText} onChange={this.inputChange()} onKeyUp={this.getKeyUp()} />
      </div>
    )
  }
}
