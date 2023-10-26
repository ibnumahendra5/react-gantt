import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useState } from 'react'
import Context from '../../context'
import { Gantt } from '../../types'
import './index.less'

const TableHeader: React.FC = () => {
  const { store } = useContext(Context)
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
    const date = dayjs(minorList[1].key).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')

    store.scrollGoToDay(date)
  }, [store, minorList])

  const handleScrollBackDay = useCallback(() => {
    const date = dayjs(minorList[0].key).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    const dateMinOne = dayjs(date).subtract(1, 'day').format('ddd, DD MMM YYYY HH:mm:ss [GMT]')

    store.scrollGoToDay(dateMinOne)
  }, [store, minorList])

  return (
    <aside className='gant-aside'>
      <div>
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
      <div>
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
  )
}
export default observer(TableHeader)
