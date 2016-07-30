import React from 'react'
import { Motion, spring, presets } from 'react-motion'
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
const boundaryLeft = (id, bRatio, basicStep, lEnd = 0, rEnd = 28, width = 1000, tWidth = 150) => {
  if (id < lEnd + bRatio) {
    return tWidth * stepMultiplier(id - lEnd)
  } else if (id > rEnd - bRatio) {
    return width - (tWidth * (1 + stepMultiplier(rEnd - 1 - id)))
  }
  return 0
}
const stepMultiplier = step => {
  let m = 0
  for (let i = 1; i <= step; i++) {
    m += (1 / (i + 2))
  }
  return m
}

const Tab = ({ name, id, activeTab, hoveredTab, onTabClick, onTabHover, onTabLeave, numberOfTabs }) => {
  const lPadding = tabLeftPadding(id, activeTab, hoveredTab)
  const rPadding = tabRightPadding(id, activeTab, hoveredTab)
  const basicStep = (1000 - 150) / numberOfTabs
  const getDefaultStyle = (id, lPadding, rPadding) => ({
    left: (basicStep * id) + 20,
    zIndex: 30 - Math.max(lPadding, rPadding)
  })
  const getStyle = (id, activeTab, hoveredTab, numberOfTabs) => {
    const basicStep = (1000 - 150) / numberOfTabs
    const activeId = hoveredTab > -1 ? hoveredTab : activeTab
    const padding = id - activeId
    const bRatio = 150 / basicStep - 2
    const lBoundary = bRatio
    const rBoundary = numberOfTabs - bRatio
    //const stepM = padding > 0 ? stepMultiplier(padding) :

    const basicPoint = activeId > lBoundary && activeId < rBoundary ? basicStep * activeId : boundaryLeft(activeId, bRatio, basicStep)
    const left = padding === 0 ? basicPoint : basicPoint + (padding * Math.max(basicStep, (150 / (Math.abs(padding) + 2))))

    return ({
      left: spring(left  + 20, presets.noWobble),
      zIndex: 30 - Math.abs(padding)
  })
}
  const tabClasses = classNames({
    'tab': true,
    [`tab-${tabPosition(id, activeTab, hoveredTab)}`]: tabPosition(id, activeTab, hoveredTab)
  })
  return (
    <Motion
      defaultStyle={getDefaultStyle(id, lPadding, rPadding)}
      style={getStyle(id, activeTab, hoveredTab, numberOfTabs)} >
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
