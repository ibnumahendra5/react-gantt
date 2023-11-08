import dayjs from 'dayjs'
import RcGantt, { enUS, GanttRef } from 'rc-gantt'
import React, { useRef, useState } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
}

function createData(len: number) {
  const result: Data[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      id: i++,
      name: 'Titleeee' + i,
      startDate: dayjs().subtract(-i, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().add(i, 'month').format('YYYY-MM-DD'),
    })
  }
  return result
}

const Button = ({
  active,
  children,
  onClick,
  ...resetProps
}: {
  active: boolean
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <button onClick={onClick} style={active ? { background: '#096dd9', color: '#fff' } : {}} {...resetProps}>
    {children}
  </button>
)

const App = () => {
  const [data, setData] = useState(createData(5))

  const ref = useRef<GanttRef>()

  const onBackToday = () => {
    if (ref && ref.current) ref.current.backToday()
  }

  const hightLightById = (id: number) => {
    if (ref && ref.current) ref.current.hightLightById(id)
  }

  const disableHighlight = () => {
    if (ref && ref.current) ref.current.disableHighlight()
  }

  const onlyAssigneeMe = () => {
    if (ref && ref.current) ref.current.onlyAssigneeMe(21)
  }

  return (
    <div style={{ width: '100%', height: 500 }}>
      <Button active onClick={() => hightLightById(0)}>
        Highlight By Id 0
      </Button>
      <Button active onClick={() => hightLightById(2)}>
        Highlight By Id 2
      </Button>
      <Button active onClick={() => hightLightById(4)}>
        Highlight By Id 4
      </Button>
      <Button active onClick={disableHighlight}>
        Disable Highlight
      </Button>
      <Button active onClick={onlyAssigneeMe}>
        Only Assignee Me
      </Button>
      <RcGantt<Data>
        data={data}
        showUnitSwitch={false}
        innerRef={ref as any}
        columns={[
          {
            name: 'name',
            label: 'Custom Title',
            width: 200,
          },
        ]}
        locale={enUS}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
          setData(prev => {
            const newList = [...prev]
            const index = newList.findIndex(val => val.id === row.id)
            newList[index] = {
              ...row,
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
            }
            return newList
          })
          return true
        }}
      />
    </div>
  )
}

export default App
