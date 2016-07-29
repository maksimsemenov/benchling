import React, { Component } from 'react'
import { tabsList } from './tabsList'
import Tabs from './Tabs'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      hovered: -1
    }
    this.handleTabClick = this._handleTabClick.bind(this)
    this.handleTabHover = this._handleTabHover.bind(this)
    this.handleTabLeave = this._handleTabLeave.bind(this)
  }
  _handleTabClick(id) {
    this.setState({ active: id })
  }
  _handleTabHover(id) {
    this.setState({ hovered: id })
  }
  _handleTabLeave(id) {
    this.setState({ hovered: -1 })
  }

  render() {
    return (
      <div className='app'>
        <div className='workspace'>        
          <Tabs
            tabs={tabsList}
            activeTab={this.state.active}
            hoveredTab={this.state.hovered}
            onTabClick={this.handleTabClick}
            onTabHover={this.handleTabHover}
            onTabLeave={this.handleTabLeave}
          />
        </div>
      </div>
    )
  }
}

export default App
