import React, { Component } from 'react'

import { SearchBar} from 'antd-mobile'
import Menu from './Menu'

import {CategoryWrap} from './StyledCategory';
export default class Categoory extends Component {
  state = {
    tabIndex:0,
    type:"category",
    searchValue:""
  }
  handleClick = (index) =>{
    return () =>{
      this.setState({
        tabIndex:index,
        type:index===1?"material":"category"
      })
    }
  }
  onChange = (val) =>{
    this.setState({
      searchValue:val
    })
  }
  render() {
    return (
      <>
      <CategoryWrap>
        <nav>
          <ul>
            <li
            className={this.state.tabIndex===0?'active':''}
            onClick={this.handleClick(0)}
            >分类</li>
            <li
            className={this.state.tabIndex===1?'active':''}
            onClick={this.handleClick(1)}
            >食材</li>
            <li className={this.state.tabIndex===0?'slide':'slide right'}></li>
          </ul>
        </nav>
        <SearchBar
              value={this.state.searchValue}
              placeholder="Search"
              onChange={this.onChange}/>
        <Menu type={this.state.type}></Menu>
      </CategoryWrap>
      </>
      
    )
  }
}
