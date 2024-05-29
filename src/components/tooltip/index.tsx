import React, { useState } from 'react'
import './Tooltip.css'

const Tooltip = (props: {
  content: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactNode
}) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    // timeout = setTimeout(() => {
    setActive(true)
    // }, props.delay || 0)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div className='Tooltip-Wrapper' onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && <div className={`Tooltip-Tip ${props.direction || 'top'}`}>{props.content}</div>}
    </div>
  )
}

export default Tooltip
