import { Divider, Flex, Tag, Typography } from 'antd'
import CoinInfo from './CoinInfo'

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol={true}/>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          1 час:
        </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          1 день:
        </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          1 неделя:
        </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          Цена:
        </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          Цена относительно BTC:
        </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: '10px' }} strong>
          Маркет Cap:
        </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text style={{ marginRight: '10px' }} strong>
            Контрактный адрес:
          </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  )
}
