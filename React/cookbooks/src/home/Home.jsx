import React, { Component } from 'react'

import {TabBar} from 'antd-mobile'
import CookBook from './cookbook/CookBook'
import Categoory from './category/Categoory';

import cookbook from '@i/cookbook.png'
import cookbook_active from '@i/cookbook-active.png'
import location from '@i/location.png'
import location_active from '@i/location-active.png'
import menu from '@i/menu.png'
import menu_active from '@i/menu-active.png'
import more from '@i/more.png'
import more_active from '@i/more-active.png'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true,
    };
  }
  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#000000"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="CookBook"
            key="CookBook"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+cookbook+') center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+cookbook_active+') center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <CookBook></CookBook>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+menu+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+menu_active+') center center /  21px 21px no-repeat' }}
              />
            }
            title="Menu"
            key="Menu"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            <Categoory></Categoory>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+location+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+location_active+') center center /  21px 21px no-repeat' }}
              />
            }
            title="Location"
            key="Location"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
          <div>Location</div>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: more }}
            selectedIcon={{ uri: more_active }}
            title="More"
            key="More"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            <div>More</div>
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}
