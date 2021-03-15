import React, { Component } from 'react'
import { connect } from 'react-redux'


// const mapDispatchToProps = dispatch => {
//   return {
//     add:(task)=>dispatch({
//       type:"ADD_DATA",
//       task
//     })
//   }
// }
const add = (task) =>({
  type:"ADD_DATA",
  task
})
const mapDispatchToProps = {
  add
}
@connect(null,mapDispatchToProps)
 class Form extends Component {
  state ={
    task:""
  }
  inputChange = (e) =>{
    this.setState({
      task:e.target.value
    })
  }
  keyUp = (e) =>{
    if(e.keyCode===13){
      this.props.add(this.state.task)
      this.setState({
        task:""
      })
    }
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.task} onChange={this.inputChange} onKeyUp={this.keyUp}/>
      </div>
    )
  }
}

export default Form