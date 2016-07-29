import React from 'react'
import { Motion, spring } from 'react-motion'
import classNames from 'classnames'
import './Tab.css'

const tabDistance = (id, activeTab, hoveredTab, gap) => {
  if (gap === 0) {return id === activeTab && id === hoveredTab}
  else if (gap > 0) {return id + gap === activeTab && !tabDistance(id, activeTab, hoveredTab, gap - 1)}
  else {return id + gap === activeTab && !tabDistance(id, activeTab, hoveredTab, gap + 1)}
}
const tabPosition = (id, activeTab, hoveredTab) => {
  if (id === activeTab) {return 'active'}
  else if (id === hoveredTab) {return 'hovered'}
  else if (tabDistance(id, activeTab, hoveredTab, -1)) {return 'before-1'}
  else if (tabDistance(id, activeTab, hoveredTab, 1)) {return 'after-1'}
  else if (tabDistance(id, activeTab, hoveredTab, -2)) {return 'before-2'}
  else if (tabDistance(id, activeTab, hoveredTab, 2)) {return 'after-1'}
  else {return false}
}
const tabLeftPadding = (id, activeTab, hoveredTab) => {
  return hoveredTab >= 0 ? Math.max(0, id - hoveredTab) : Math.max(0, id - activeTab)
}
const tabRightPadding = (id, activeTab, hoveredTab) => {
  return hoveredTab >= 0 ? Math.max(0, hoveredTab - id) : Math.max(0, activeTab - id)
}
const margin = (padding) => padding > 6 ? 100 : Math.pow(padding, 2) * 5

const Tab = ({ name, id, activeTab, hoveredTab, onTabClick, onTabHover, onTabLeave, compression = 150 }) => {
  const getDefaultStyle = () => ({ marginLeft: 0, marginRight: 0 })
  const getStyle = (tabLeftPadding, tabRightPadding) => {
    console.log(tabLeftPadding, margin(tabLeftPadding), tabRightPadding, margin(tabRightPadding))
    return ({
    marginRight: -spring(margin(tabLeftPadding)),
    marginRLeft: -spring(margin(tabRightPadding)),
    width: spring(Math.max(10, 150 / Math.min(tabLeftPadding, tabRightPadding)))
  })
}
  const tabClasses = classNames({
    'tab': true,
    [`tab-${tabPosition(id, activeTab, hoveredTab)}`]: tabPosition(id, activeTab, hoveredTab)
  })
  return (
    <Motion
      defaultStyle={getDefaultStyle()}
      style={getStyle(tabLeftPadding(id, activeTab, hoveredTab), tabRightPadding(id, activeTab, hoveredTab))} >
      {interpolatedStyle =>
        <li
          className={tabClasses}
          onClick={() => onTabClick(id)}
          onMouseEnter={() => onTabHover(id)}
          onMouseLeave={() => onTabLeave(id)}
          style={interpolatedStyle}
        >{name}</li>}
    </Motion>
  )
}

export default Tab
