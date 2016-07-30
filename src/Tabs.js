import React, { Component } from 'react'
import Tab from './Tab'
import './Tabs.css'

class Tabs extends Component {
  render() {
    const { tabs, ...rest } = this.props
    return (
      <ul className='tabs' ref={(c) => {this.tabs = c}}>
        {tabs.map(tab =>
          <Tab {...rest} name={tab.name} id={tab.id} key={tab.id} numberOfTabs={tabs.length} />
        )}
      </ul>
    )
  }
}

export default Tabs
