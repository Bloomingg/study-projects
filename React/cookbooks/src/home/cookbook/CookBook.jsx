import React, { Component } from 'react'

import {Wraper} from './style'

import Swiper from './Swiper'
import HotCate from './HotCate'

import { SearchBar } from 'antd-mobile';

export default class CookBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      value:""
    }
  }

  onChange = (val) =>{
    this.setState({
      value:val
    })
  }

  render() {
    return (
      <Wraper>
          <header>美食大全</header>
          <Swiper></Swiper>
          <SearchBar
            value={this.state.value}
            placeholder="Search"
            onSubmit={value => console.log(value, 'onSubmit')}
            onClear={value => console.log(value, 'onClear')}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={() => console.log('onCancel')}
            onChange={this.onChange}/>
            <HotCate></HotCate>
      </Wraper>
        
    )
  }
}
