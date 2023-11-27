import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useRef } from 'react'
import Context from '../../context'
import './index.less'

/**
 * 鼠标hover效果模拟
 */
const HighlightIndicator: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const { showHighlightIndicator, highlightIndicatorTop, rowHeight } = store
  const prefixClsSelectionIndicator = `${prefixCls}-highlight-indicator`
  const focusRef = useRef(null)

  // focus on the element
  useEffect(() => {
    if (showHighlightIndicator) {
      focusRef.current.scrollIntoView()
    }
  }, [showHighlightIndicator])

  return showHighlightIndicator ? (
    <div
      ref={focusRef}
      className={prefixClsSelectionIndicator}
      style={{
        height: rowHeight,
        top: highlightIndicatorTop,
      }}
    />
  ) : null
}
export default observer(HighlightIndicator)
