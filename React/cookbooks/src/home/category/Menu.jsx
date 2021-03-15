import React, { Component } from 'react'
import PropTypes from 'prop-types';

import MenuList from '@c/menu/MenuList';

import {get} from "@/utils/http"

export default class Menu extends Component {
  static propTypes = {
    type:PropTypes.string
  }
  state = {
    cate:null,
    curCate:this.props.type==="category"?"热门":"肉类",
  }
  async componentDidMount(){
    let res = await get({
      url:'/api/cate'
    })
    this.setState({
      cate:res.data.data
    })
  }
  handleAside = (curCate) =>{
    return () =>{
      console.log(curCate);
      this.setState({
        curCate
      })
    }
  }
  render() {
    console.log(this.props);
    return (
        <MenuList 
        onHandleAside={this.handleAside}
        curCate={this.state.curCate}
        cate={this.state.cate&&this.state.cate[this.props.type]}></MenuList>
    )
  }
}
