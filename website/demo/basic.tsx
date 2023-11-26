import dayjs from 'dayjs'
import RcGantt from 'ibnu-rc-gantt'
import React, { useState } from 'react'

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
      id: i,
      name: '一个名称一个名称一个名称一个名称',
      startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
    })
  }
  return result
}

const App = () => {
  const [data, setData] = useState(createData(20))
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        lang='en-US'
        data={data}
        columns={[
          {
            name: 'name',
            label: '名称',
            width: 100,
          },
        ]}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
          return true
        }}
      />
    </div>
  )
}

export default App
