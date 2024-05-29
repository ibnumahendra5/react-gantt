import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import Context from '../../context'
import { specialDaysStore } from '../../hooks/specialDays'
import './index.less'
const SpecialDays: React.FC = () => {
  const { store, prefixCls } = useContext(Context)

  const minorList = store.getMinorList()
  const specialDays = specialDaysStore.specialDays

  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 })

  const showTooltip = (content, x, y) => {
    setTooltip({ visible: true, content, x, y })
  }

  const hideTooltip = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 })
  }

  return (
    <>
      {specialDays?.items?.length > 0 &&
        specialDays?.items.map((item, index) => (
          <div
            key={index}
            className={`${prefixCls}-special-days`}
            style={{
              transform: `translate(${store.getTranslateXByDate(dayjs(item.date).format('YYYY-MM-DD')) - 10}px)`,
            }}
            onMouseEnter={e =>
              showTooltip(`Special day: ${dayjs(item.date).format('YYYY-MM-DD')}`, e.clientX, e.clientY)
            }
          >
            <div
              className={`${prefixCls}-special-days_line`}
              style={{
                height: store.bodyScrollHeight,
              }}
            />
          </div>
        ))}
      {tooltip.visible && (
        <div className='tooltip tooltip-visible' style={{ top: tooltip.y + 10 + 'px', left: tooltip.x + 10 + 'px' }}>
          {tooltip.content}
        </div>
      )}
    </>
  )
}
export default observer(SpecialDays)
