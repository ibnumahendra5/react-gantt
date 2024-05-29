import classNames from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Context from '../../context'
import DragResize from '../drag-resize'
import './index.less'

const TimeAxis: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const prefixClsTimeAxis = `${prefixCls}-time-axis`
  const { sightConfig, isToday, getSpecialsDay, getToday } = store
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

  const [specialDays, setSpecialDays] = useState([])

  // Get special days around the current year
  useEffect(() => {
    const today = getToday('YYYY')
    const getSpecialDays = async () => {
      const res = await getSpecialsDay(today)

      setSpecialDays(res)
    }
    getSpecialDays()
  }, [])

  const handleSpecialDays = useCallback(
    item => {
      const { key } = item
      const { type } = sightConfig

      if (type === 'day' && specialDays.length > 0) {
        specialDays.forEach(day => {
          const formattedKey = dayjs(key).format('DD/MM/YYYY')

          console.log(day?.ActualDate, formattedKey)

          if (day?.ActualDate === formattedKey) {
            return true
          }
        })

        return false
      }
      return false
    },
    [sightConfig, specialDays]
  )

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
