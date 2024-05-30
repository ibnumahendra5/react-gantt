import classNames from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect } from 'react'
import Context from '../../context'
import { specialDaysStore } from '../../hooks/specialDays'
import DragResize from '../drag-resize'
import './index.less'

const TimeAxis: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const prefixClsTimeAxis = `${prefixCls}-time-axis`
  const { sightConfig, isToday, getToday } = store
  const majorList = store.getMajorList()
  const minorList = store.getMinorList()
  const handleResize = useCallback(
    ({ x }) => {
      store.handlePanMove(-x)
    },
    [store]
  )
  const handleLeftResizeEnd = useCallback(() => {
    store.handlePanEnd()
  }, [store])

  const getIsToday = useCallback(
    item => {
      const { key } = item
      const { type } = sightConfig
      return type === 'day' && isToday(key)
    },
    [sightConfig, isToday]
  )

  // Get special days around the current year
  useEffect(() => {
    const today = getToday('YYYY')
    specialDaysStore.getSpecialsDay({
      year: today,
      locale: specialDaysStore.locale,
    })
  }, [])

  const handleSpecialDays = item => {
    const { key } = item
    const { type } = sightConfig
    const items = specialDaysStore.specialDays?.items

    if (type === 'day' && items?.length > 0) {
      const formattedKey = dayjs(key).format('YYYY-MM-DD')
      return items.some(item => item.date === formattedKey)
    }

    return false
  }

  return (
    <DragResize
      onResize={handleResize}
      onResizeEnd={handleLeftResizeEnd}
      defaultSize={{
        x: -store.translateX,
        width: 0,
      }}
      type='move'
    >
      <div
        className={prefixClsTimeAxis}
        style={{
          left: store.tableWidth,
          width: store.viewWidth,
        }}
      >
        <div
          className={`${prefixClsTimeAxis}-render-chunk`}
          style={{
            transform: `translateX(-${store.translateX}px`,
          }}
        >
          {majorList.map(item => (
            <div key={item.key} className={`${prefixClsTimeAxis}-major`} style={{ width: item.width, left: item.left }}>
              <div className={`${prefixClsTimeAxis}-major-label`}>{item.label}</div>
            </div>
          ))}
          {minorList.map(item => (
            <div
              key={item.key}
              className={classNames(`${prefixClsTimeAxis}-minor`)}
              style={{ width: item.width, left: item.left }}
            >
              <div
                className={classNames(`${prefixClsTimeAxis}-minor-label`, {
                  [`${prefixClsTimeAxis}-today`]: getIsToday(item),
                  [`${prefixClsTimeAxis}-special-days`]: handleSpecialDays(item),
                })}
              >
                {item.label}
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {item.ext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragResize>
  )
}
export default observer(TimeAxis)
