import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    list:state.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove:(index)=>{
        dispatch({
          type:"REMOVE_DATA",
          index
        })
    }
  }
}


@connect(mapStateToProps,mapDispatchToProps)
class List extends Component {

  handleClick = (index) =>{
    return ()=>{
      this.props.remove(index)
    }
  }

  render() {
    return (
        <ul>
          {
            this.props.list.map((value,index)=>{
             return <li key={value}>{value}  <button onClick={this.handleClick(index)}>remove</button></li>
            })
          }
        </ul>
    )
  }
}

export default List