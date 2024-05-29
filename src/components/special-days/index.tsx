import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import './index.less'
const SpecialDays: React.FC = () => {
  const { store, prefixCls } = useContext(Context)

  const { sightConfig, getSpecialsDay } = store

  // const handleSpecialDays = useCallback(
  //   async item => {
  //     const { key } = item
  //     const { type } = sightConfig

  //     const specialDays = await getSpecialsDay()

  //     console.log(specialDays)

  //     specialDays.forEach(day => {
  //       console.log(day)
  //     })

  //     console.log(store.getTranslateXByDate('Sun, 19 May 2024 08:01:58 GMT'))

  //     // return specialDays
  //   },
  //   [sightConfig, getSpecialsDay]
  // )

  // handleSpecialDays({ key: 'Sun, 19 May 2024 07:58:56 GMT' })

  return (
    <div
      className={`${prefixCls}-special-days`}
      style={{
        transform: `translate(${store.todayTranslateX - 100}px)`,
      }}
    >
      <div
        className={`${prefixCls}-special-days_line`}
        style={{
          height: store.bodyScrollHeight,
        }}
      />
    </div>
  )
}
export default observer(SpecialDays)
