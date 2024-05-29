// import { Document, Page, View } from '@react-pdf/renderer'
import { useSize } from 'ahooks'
import { Dayjs } from 'dayjs'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import generatePDF, { Options } from 'react-to-pdf'
import Aside from './components/aside'
import Chart from './components/chart'
import Divider from './components/divider'
import HighlightIndicator from './components/highlight-indicator'
import ScrollBar from './components/scroll-bar'
import ScrollTop from './components/scroll-top'
import SelectionIndicator from './components/selection-indicator'
import TableBody from './components/table-body'
import TableHeader from './components/table-header'
import TimeAxis from './components/time-axis'
import TimeAxisScaleSelect from './components/time-axis-scale-select'
import TimeIndicator from './components/time-indicator'
import { BAR_HEIGHT, ROW_HEIGHT, TABLE_INDENT } from './constants'
import Context, { GanttContext } from './context'
import './Gantt.less'
import { zhCN } from './locales'
import GanttStore from './store'
import { DefaultRecordType, Gantt } from './types'

const prefixCls = 'gantt'

const Body: React.FC = ({ children }) => {
  const { store } = useContext(Context)
  const reference = useRef<HTMLDivElement>(null)
  const size = useSize(reference)

  useEffect(() => {
    store.syncSize(size)
  }, [size, store])

  return (
    <div id={'content-id'} className={`${prefixCls}-body`} ref={reference}>
      {children}
    </div>
  )
}

export interface GanttProps<RecordType = DefaultRecordType> {
  data: Gantt.Record<RecordType>[]
  columns: Gantt.Column[]
  dependencies?: Gantt.Dependence[]
  onUpdate: (record: Gantt.Record<RecordType>, startDate: string, endDate: string) => Promise<boolean>
  startDateKey?: string
  endDateKey?: string
  isRestDay?: (date: string) => boolean
  unit?: Gantt.Sight
  rowHeight?: number
  innerRef?: React.MutableRefObject<GanttRef>
  getBarColor?: GanttContext<RecordType>['getBarColor']
  showBackToday?: GanttContext<RecordType>['showBackToday']
  showUnitSwitch?: GanttContext<RecordType>['showUnitSwitch']
  onRow?: GanttContext<RecordType>['onRow']
  tableIndent?: GanttContext<RecordType>['tableIndent']
  expandIcon?: GanttContext<RecordType>['expandIcon']
  renderBar?: GanttContext<RecordType>['renderBar']
  renderGroupBar?: GanttContext<RecordType>['renderGroupBar']
  renderInvalidBar?: GanttContext<RecordType>['renderInvalidBar']
  renderBarThumb?: GanttContext<RecordType>['renderBarThumb']
  onBarClick?: GanttContext<RecordType>['onBarClick']
  tableCollapseAble?: GanttContext<RecordType>['tableCollapseAble']
  scrollTop?: GanttContext<RecordType>['scrollTop']
  disabled?: boolean
  highlight?: boolean
  alwaysShowTaskBar?: boolean
  renderLeftText?: GanttContext<RecordType>['renderLeftText']
  renderRightText?: GanttContext<RecordType>['renderLeftText']
  onExpand?: GanttContext<RecordType>['onExpand']
  renderHeader?: GanttContext<RecordType>['renderHeader']
  /**
   * 自定义日期筛选维度
   */
  customSights?: Gantt.SightConfig[]
  locale?: GanttLocale

  /**
   * 隐藏左侧表格
   */
  hideTable?: boolean
}
export interface GanttRef {
  backToday: () => void
  hightLightById: (id: number) => void
  disableHighlight: () => void
  getWidthByDate: (startDate: Dayjs, endDate: Dayjs) => number
  onlyAssigneeMe: (id: number) => void
}

export interface GanttLocale {
  today: string
  day: string
  days: string
  threeDay: string
  week: string
  month: string
  quarter: string
  halfYear: string
  firstHalf: string
  secondHalf: string
  majorFormat: {
    day: string
    threeDay: string
    week: string
    month: string
    quarter: string
    halfYear: string
  }
  minorFormat: {
    day: string
    threeDay: string
    week: string
    month: string
    quarter: string
    halfYear: string
  }
}

export const defaultLocale: GanttLocale = { ...zhCN }

const GanttComponent = <RecordType extends DefaultRecordType>(props: GanttProps<RecordType>) => {
  const {
    data,
    columns,
    dependencies = [],
    onUpdate,
    startDateKey = 'startDate',
    endDateKey = 'endDate',
    isRestDay,
    getBarColor,
    showBackToday = true,
    showUnitSwitch = true,
    unit,
    onRow,
    tableIndent = TABLE_INDENT,
    expandIcon,
    renderBar,
    renderInvalidBar,
    renderGroupBar,
    onBarClick,
    tableCollapseAble = true,
    renderBarThumb,
    scrollTop = true,
    rowHeight = ROW_HEIGHT,
    innerRef,
    disabled = false,
    highlight = false,
    alwaysShowTaskBar = true,
    renderLeftText,
    renderRightText,
    renderHeader,
    onExpand,
    customSights = [],
    locale = { ...defaultLocale },
    hideTable = false,
  } = props

  const store = useMemo(() => new GanttStore({ rowHeight, disabled, highlight, customSights, locale }), [rowHeight])
  const [isExport, setIsExport] = useState(false)

  useEffect(() => {
    store.setData(data, startDateKey, endDateKey)
  }, [data, endDateKey, startDateKey, store])

  useEffect(() => {
    store.setColumns(columns)
  }, [columns, store])

  useEffect(() => {
    store.setOnUpdate(onUpdate)
  }, [onUpdate, store])

  useEffect(() => {
    store.setDependencies(dependencies)
  }, [dependencies, store])

  useEffect(() => {
    store.setHideTable(hideTable)
  }, [hideTable])

  useEffect(() => {
    if (isRestDay) store.setIsRestDay(isRestDay)
  }, [isRestDay, store])

  useEffect(() => {
    if (unit) store.switchSight(unit)
  }, [unit, store])

  useImperativeHandle(innerRef, () => ({
    backToday: () => store.scrollToToday(),
    nextDay: (date: string) => store.scrollGoToDay(date),
    prevDay: (date: string) => store.scrollGoToDay(date),
    getWidthByDate: store.getWidthByDate,
    hightLightById: (id: number) => store.hightLightById(id),
    disableHighlight: () => store.disableHighlight(),
    onlyAssigneeMe: (id: number) => store.onlyAssigneeMe(id),
  }))

  const ContextValue = React.useMemo(
    () => ({
      prefixCls,
      store,
      getBarColor,
      showBackToday,
      showUnitSwitch,
      onRow,
      tableIndent,
      expandIcon,
      renderBar,
      renderInvalidBar,
      renderGroupBar,
      onBarClick,
      tableCollapseAble,
      renderBarThumb,
      scrollTop,
      barHeight: BAR_HEIGHT,
      alwaysShowTaskBar,
      renderLeftText,
      renderRightText,
      onExpand,
      hideTable,
      renderHeader,
    }),
    [
      store,
      getBarColor,
      showBackToday,
      showUnitSwitch,
      onRow,
      tableIndent,
      expandIcon,
      renderBar,
      renderInvalidBar,
      renderGroupBar,
      onBarClick,
      tableCollapseAble,
      renderBarThumb,
      scrollTop,
      alwaysShowTaskBar,
      renderLeftText,
      renderRightText,
      onExpand,
      hideTable,
      renderHeader,
    ]
  )

  const getTargetElement = () => document.getElementById('content-id')

  const handleGeneratePDF = (getTargetElement: any, options: Options) => {
    setIsExport(true)

    setTimeout(() => {
      generatePDF(getTargetElement, options)
    }, 1000)
  }

  async function printDocument() {
    return new Promise<void>((resolve, reject) => {
      const input = document.getElementById('content-id')
      setIsExport(true)

      html2canvas(input, {
        onclone: document => {
          // hidden
          document.getElementById('aside-header').style.display = 'none'
          document.getElementById('divider').style.display = 'none'
          document.getElementById('scroll-bar').style.display = 'none'

          if (document.getElementById('scroll-top')) {
            document.getElementById('scroll-top').style.display = 'none'
          }

          if (document.getElementById('selection-indicator')) {
            document.getElementById('selection-indicator').style.display = 'none'
          }
        },
      })
        .then(canvas => {
          let imgWidth = 208
          let imgHeight = (canvas.height * imgWidth) / canvas.width

          console.log(imgHeight)

          const imgData = canvas.toDataURL('img/png')
          const pdf = new jsPDF('p', 'mm', [297, 210])

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

          // Save the PDF and only after it's saved, set isExport to false
          return pdf.save('download.pdf', { returnPromise: true })
        })
        .then(() => {
          setIsExport(false)
          resolve()
        })
        .catch(error => {
          setIsExport(false)
          reject(error)
        })
    })
  }

  return (
    <Context.Provider value={ContextValue}>
      {/* <button
        onClick={() =>
          handleGeneratePDF(getTargetElement, {
            // ...options,
            filename: 'gantt-chart.pdf',
            method: 'save',
            page: {
              margin: 10,
              format: 'A4',
              orientation: 'landscape',
            },
            overrides: {
              pdf: {
                compress: true,
                floatPrecision: 100,
                precision: 100,
                unit: 'mm',
              },
              canvas: {
                useCORS: true,
              },
            },
          })
        }
      >
        Download PDF
      </button> */}

      <button onClick={printDocument}>Save as PDF</button>

      <Body>
        <Aside />
        <header
          style={{
            height: unit === 'day' ? 85 : 56,
            overflow: unit === 'day' ? 'visible' : 'hidden',
          }}
        >
          {!hideTable && <TableHeader />}
          <TimeAxis />
        </header>
        <main ref={store.mainElementRef} onScroll={store.handleScroll}>
          <SelectionIndicator />
          <HighlightIndicator />
          {!hideTable && <TableBody />}
          <Chart />
        </main>
        {!hideTable && <Divider />}
        {showBackToday && <TimeIndicator />}
        {showUnitSwitch && <TimeAxisScaleSelect />}
        <ScrollBar />
        {scrollTop && <ScrollTop />}
      </Body>
    </Context.Provider>
  )
}
export default GanttComponent
