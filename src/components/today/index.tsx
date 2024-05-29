import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import './index.less'

const Today: React.FC = () => {
  const { store, prefixCls } = useContext(Context)

  const minorList = store.getMinorList()

  return (
    <div
      className={`${prefixCls}-today`}
      style={{
        transform: `translate(${store.todayTranslateX}px)`,
      }}
    >
      <div
        className={`${prefixCls}-today_line`}
        style={{
          height: store.bodyScrollHeight,
          backgroundColor: 'rgba(187, 182, 253, 0.4)',
          marginLeft: 0,
          width: minorList[0].width,
        }}
      />
    </div>
  )
}
export default observer(Today)
