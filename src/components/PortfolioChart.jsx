import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useCrypto } from '../context/crypto-context'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PortfolioChart() {
  const { assets } = useCrypto({})
  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(86, 255, 94)',
          'rgb(86, 103, 255)',
          'rgb(255, 86, 227)',
          'rgb(255, 154, 86)',
          'rgb(255, 86, 165)',
          'rgb(224, 255, 86)',
        ],
        hoverOffset: 1,
      },
    ],
  }
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        height: 600,
      }}
    >
      <Pie data={data} />
    </div>
  )
}
