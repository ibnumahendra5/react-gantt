import React, { ReactNode, useEffect, useRef, useState } from 'react'
interface TooltipCursorProps {
  content: ReactNode
  children: React.ReactNode
  delay: number
  position: number
  height?: number
}
export const TooltipCursor: React.FC<TooltipCursorProps> = ({ children, content, delay, position, height }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltipContent, setShowTooltipContent] = useState(false)

  const tooltipRef = useRef<HTMLDivElement>(document.createElement('div'))

  // const handleMouseMove = (event: React.MouseEvent) => {
  //   const { clientX, clientY } = event

  //   // console.log('clientX', clientX, 'clientY', clientY)

  //   const tooltipWidth = tooltipRef.current?.offsetWidth || 0
  //   const tooltipHeight = tooltipRef.current?.offsetHeight || 0
  //   const viewportWidth = window.innerWidth
  //   const viewportHeight = window.innerHeight

  //   //+12 is added to give a spice between cursor and tooltip
  //   let tooltipX = clientX + 12
  //   let tooltipY = clientY + 12

  //   // // Check if tooltip exceeds the right side of the viewport
  //   // if (tooltipX + tooltipWidth > viewportWidth) {
  //   //   tooltipX = clientX - tooltipWidth - 10
  //   // }

  //   // // Check if tooltip exceeds the bottom of the viewport
  //   // if (tooltipY + tooltipHeight > viewportHeight) {
  //   //   tooltipY = viewportHeight - tooltipHeight - 10
  //   // }

  //   // if (tooltipY + tooltipHeight > height) {
  //   //   tooltipY = height - tooltipHeight - 10
  //   // }
  //   const h = clientY * 2 + tooltipHeight
  //   console.log(h, height, tooltipHeight, clientY)

  //   // passing static x value to keep tooltip in the same position
  //   setTooltipPosition({ x: 0, y: 100 })
  // }

  const convertPosition = (cursorPosition: number, minSrc: number, maxSrc: number, minDst: number, maxDst: number) => {
    const srcRange = maxSrc - minSrc
    const dstRange = maxDst - minDst
    const positionInDst = ((cursorPosition - minSrc) / srcRange) * dstRange + minDst
    const h = height
    return positionInDst
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event

    const tooltipWidth = tooltipRef.current?.offsetWidth || 0
    const tooltipHeight = tooltipRef.current?.offsetHeight || 0
    const viewportWidth = window.innerWidth

    let tooltipX = clientX + 12
    let tooltipY = convertPosition(clientY, 312, 665, 100, 1400)

    if (tooltipX + tooltipWidth > viewportWidth) {
      tooltipX = clientX - tooltipWidth - 12
    }

    setTooltipPosition({ x: tooltipX, y: 150 })
  }

  const handleMouseEnter = () => {
    setTooltipVisible(true)
    setShowTooltipContent(false)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isTooltipVisible) {
      timeoutId = setTimeout(() => {
        setShowTooltipContent(true)
      }, delay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isTooltipVisible, delay])

  return (
    <div
      style={{
        // position: 'relative',
        minWidth: 'min-content',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          style={{
            top: tooltipPosition.y,
            // left: tooltipPosition.x,
            // left: 0,
            transform: `translate(${position}px)`,
            zIndex: '1',
            position: 'fixed',
            padding: '0.875rem',
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            // opacity: showTooltipContent ? 1 : 0,
            transition: 'opacity 1s',
            maxWidth: '20rem',
          }}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  )
}

export default TooltipCursor
