import { Flex, Typography } from 'antd'

export default function CoinInfo({ coin, withSymbol = false }) {
  return (
    <Flex align="center">
      <img
        width={40}
        src={coin.icon}
        alt={coin.name}
        style={{ marginRight: '10px' }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol ? coin.symbol : ''} {coin.name}
      </Typography.Title>
    </Flex>
  )
}
