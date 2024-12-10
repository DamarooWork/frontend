import { Table } from 'antd'
import { useCrypto } from '../context/crypto-context'

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Цена, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
]

export default function AssetsTable() {
  const { assets } = useCrypto({})

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }))

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  )
}
