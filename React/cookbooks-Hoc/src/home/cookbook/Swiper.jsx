import React, { Component } from 'react'

import { Carousel } from 'antd-mobile'

import {SwiperWrap} from './style'
import img1 from '@i/swiper-1.png'
import img2 from '@i/swiper-2.jpeg'
import img3 from '@i/swiper-3.jpeg'

export default class Swiper extends Component {
  render() {
    return (
      <SwiperWrap>
        <Carousel
        autoplay
        infinite>
        <img src={img1} alt=""/>
        <img src={img2} alt=""/>
        <img src={img3} alt=""/>
        </Carousel>
      </SwiperWrap>
    )
  }
}
