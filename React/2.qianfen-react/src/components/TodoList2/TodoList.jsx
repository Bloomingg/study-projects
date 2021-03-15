import React, { Component } from 'react'
import List from './List'
import Input from './Input'

export default class TodoList extends Component {
  state = {
    list: []
  }
  addTodo = () => {
    return (title) => {
      // console.log(title);
      const newTodo = {
        id:new Date().getTime(),
        title
      }
      this.state.list.push(newTodo)
      this.setState({})
    }
  }
  deleteTodo = (id) =>{
    return () =>{
      // console.log(id);
      const newList = this.state.list.filter(todo=>{
        return todo.id !== id
      })
      this.setState({
        list: newList
      })
    }
  }
  render() {
    return (
      <div>
        <Input onSaveTodo={this.addTodo()} />
        <List onDeleteItem={this.deleteTodo} list={this.state.list} />
      </div>
    )
  }
}
