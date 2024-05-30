import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import { specialDaysStore } from '../../hooks/specialDays'
import TooltipCursor from '../tooltip'
import './index.less'
const SpecialDays: React.FC = () => {
  const { store, prefixCls } = useContext(Context)

  const { sightConfig } = store
  const { type } = sightConfig

  const minorList = store.getMinorList()
  const specialDays = specialDaysStore.specialDays

  return (
    <>
      {specialDays?.items?.length > 0 &&
        type === 'day' &&
        specialDays?.items.map((item, index) => (
          <TooltipCursor
            content={
              <div className={`${prefixCls}-special-days_tooltip_content`}>
                <span className={`${prefixCls}-special-days-tooltip_title`}>{item.summary}</span>
                <span className={`${prefixCls}-special-days-tooltip_description`}>{item.description}</span>
                <span className={`${prefixCls}-special-days-tooltip_date`}>
                  {dayjs(item.date_detail).format('DD MMM YYYY')}
                </span>
              </div>
            }
            delay={200}
            position={store.getTranslateXByDate(dayjs(item.date).format('YYYY-MM-DD'))}
            height={store.bodyScrollHeight}
            key={index}
          >
            <div
              key={index}
              className={`${prefixCls}-special-days_wrapper`}
              style={{
                transform: `translate(${store.getTranslateXByDate(dayjs(item.date).format('YYYY-MM-DD'))}px)`,
              }}
            >
              <div
                className={`${prefixCls}-special-days_line`}
                style={{
                  height: store.bodyScrollHeight,
                  backgroundColor: 'rgba(253, 182, 182, 0.4)',
                  marginLeft: 0,
                  width: minorList[0].width - 1,
                }}
              />
            </div>
          </TooltipCursor>
        ))}
    </>
  )
}
export default observer(SpecialDays)
