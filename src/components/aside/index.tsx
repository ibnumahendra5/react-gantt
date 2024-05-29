import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useState } from 'react'
import Context from '../../context'
import { Gantt } from '../../types'
import './index.less'

const TableHeader: React.FC = () => {
  const { store, renderHeader } = useContext(Context)
  const minorList = store.getMinorList()

  const { viewTypeList } = store
  const [hasActive, setHasActive] = useState('day')

  const handleSelect = useCallback(
    (item: Gantt.SightConfig) => {
      store.switchSight(item.type)
      setHasActive(item.type)
    },
    [store]
  )

  const handleScrollNextDay = useCallback(() => {
    let nextRange = dayjs(minorList[minorList.length - 1].key)
      .add(1, 'day')
      .format('ddd, DD MMM YYYY HH:mm:ss [GMT]')

    if (hasActive === 'week') {
      nextRange = dayjs(minorList[minorList.length - 1].key)
        .add(7, 'day')
        .format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    }

    store.scrollGoToDay(nextRange)
  }, [store, minorList])

  const handleScrollBackDay = useCallback(() => {
    const date = dayjs(minorList[0].key).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    const totalDay = dayjs(minorList[minorList.length - 1].key).diff(dayjs(minorList[0].key), 'day')

    let prevRange = dayjs(date)
      .subtract(totalDay + 1, 'day')
      .format('ddd, DD MMM YYYY HH:mm:ss [GMT]')

    if (hasActive === 'week') {
      prevRange = dayjs(date)
        .subtract(totalDay + 7, 'day')
        .format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    }

    store.scrollGoToDay(prevRange)
  }, [store, minorList])

  return (
    <>
      <aside className='gant-aside row'>
        <div className='col-md-6'>
          <button className='btn-range' onClick={handleScrollBackDay}>
            &lt;
          </button>
          <span className='time-range'>
            {dayjs(minorList[0].key).format('DD MMMM YYYY')} -{' '}
            {dayjs(minorList[minorList.length - 1].key).format('DD MMMM YYYY')}
          </span>
          <button className='btn-range' onClick={handleScrollNextDay}>
            &gt;
          </button>
        </div>
        <div className='col-md-6'>
          <div className='btn-group'>
            {viewTypeList.map(item => (
              <button
                key={item.type}
                className={hasActive === item.type ? 'active' : ''}
                onClick={() => {
                  handleSelect(item)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {renderHeader}
    </>
  )
}
export default observer(TableHeader)
