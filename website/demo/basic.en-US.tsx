import RcGantt, { enUS, GanttRef } from 'ibnu-rc-gantt'
import React, { useRef } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
}

// function createData(len: number) {
//   const result: Data[] = []
//   for (let i = 0; i < len; i++) {
//     result.push({
//       id: i++,
//       name: 'Titleeee' + i,
//       startDate: dayjs().subtract(-i, 'month').format('YYYY-MM-DD'),
//       endDate: dayjs().add(i, 'month').format('YYYY-MM-DD'),
//     })
//   }
//   return result
// }

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
  const data = new Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    name: 'Drainage',
    startDate: '2024-05-10',
    endDate: '2024-05-30',
    collapsed: false,
    disabled: true,
    backgroundColor: '#5648FB',
    borderColor: '#5648FB',
    totalDays: 10,
    assignee: [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://picsum.photos/seed/picsum/200/300',
      },
      {
        id: '2',
        name: 'Pelir Kuda',
        avatar: 'https://picsum.photos/seed/picsum/200/300',
      },
    ],
    children: [
      {
        id: index + 10,
        startDate: '2024-05-20',
        endDate: '2025-05-31',
        name: 'Lay Drainage Pipes',
        collapsed: false,
        content: '123123123',
        backgroundColor: '#5648FB',
        borderColor: '#5648FB',
        totalDays: 5,
        assignee: [
          {
            name: 'John Doe',
            avatar: 'https://picsum.photos/seed/picsum/200/300',
          },
        ],
      },
      {
        id: index + 20,
        startDate: '2023-05-15',
        endDate: '2023-05-25',
        name: 'Roofer',
        collapsed: false,
        content: '123123123',
        backgroundColor: '#5648FB',
        borderColor: '#5648FB',
        totalDays: 5,
        assignee: [
          {
            name: 'John Doe',
            avatar: 'https://picsum.photos/seed/picsum/200/300',
          },
        ],
        children: [
          {
            id: index + 30,
            startDate: '2024-05-15',
            endDate: '2024-05-20',
            name: 'Lay Drainage Pipes',
            collapsed: false,
            content: '123123123',
            backgroundColor: '#5648FB',
            borderColor: '#5648FB',
            totalDays: 5,
            assignee: [
              {
                name: 'John Doe',
                avatar: 'https://picsum.photos/seed/picsum/200/300',
              },
            ],
          },
        ],
      },
    ],
  }))

  const ref = useRef<GanttRef>()

  const onBackToday = () => {
    if (ref && ref.current) ref.current.backToday()
  }

  const hightLightById = (id: number) => {
    if (ref && ref.current) ref.current.hightLightById(id)
    console.log(id)
  }

  const disableHighlight = () => {
    if (ref && ref.current) ref.current.disableHighlight()
  }

  const onlyAssigneeMe = () => {
    if (ref && ref.current) ref.current.onlyAssigneeMe(21)
  }

  return (
    <div style={{ width: '100%', height: 500 }}>
      {/* <Button active onClick={() => hightLightById(5)}>
        Highlight By Id 5
      </Button>
      <Button active onClick={disableHighlight}>
        Disable Highlight
      </Button>
      <Button active onClick={onlyAssigneeMe}>
        Only Assignee Me
      </Button> */}
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
        // renderBar={(barInfo, { width, height }) => (
        //   <div
        //     style={{
        //       width: `${width}px`,
        //       height: '20px',
        //       backgroundColor: barInfo?.record?.backgroundColor,
        //       border: `1px solid ${barInfo?.record?.backgroundColor ?? '#fff'}`,
        //       borderRadius: '20px',
        //       display: 'flex',
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //     }}
        //   ></div>
        // )}
        onBarClick={() => {
          console.log('bar click')
        }}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
          // setData(prev => {
          //   const newList = [...prev]
          //   const index = newList.findIndex(val => val.id === row.id)
          //   newList[index] = {
          //     ...row,
          //     startDate: dayjs(startDate).format('YYYY-MM-DD'),
          //     endDate: dayjs(endDate).format('YYYY-MM-DD'),
          //   }
          //   return newList
          // })
          return true
        }}
      />
    </div>
  )
}

export default App
