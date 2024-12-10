import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { FallOutlined, RiseOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'

const siderStyle = {
  padding: '1rem',
}

export default function Sider() {
  const { assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color:
                asset.growPercent === 0
                  ? 'black'
                  : asset.grow
                  ? '#3f8600'
                  : '#cf1322',
            }}
            prefix={
              asset.growPercent === 0 ? (
                ''
              ) : asset.grow ? (
                <RiseOutlined />
              ) : (
                <FallOutlined />
              )
            }
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Общая выгода',
                value: asset.totalProfit,
                withTag: true,
              },
              {
                title: 'Количество валюты',
                value: asset.amount,
                isPlain: true,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag ? (
                    <Tag
                      color={
                        asset.growPercent === 0
                          ? '#ccc'
                          : asset.grow
                          ? 'green'
                          : 'red'
                      }
                    >
                      {asset.growPercent}%
                    </Tag>
                  ) : (
                    ''
                  )}
                  {item.isPlain ? (
                    item.value
                  ) : (
                    <Typography.Text
                      type={
                        asset.growPercent === 0
                          ? 'default'
                          : asset.grow
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
