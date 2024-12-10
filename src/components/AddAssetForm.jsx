import { useState, useRef } from 'react'
import {
  Space,
  Select,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd'
import { useCrypto } from '../context/crypto-context'
import CoinInfo from './CoinInfo'

const validateMessages = {
  required: '${label} is required!',
  type: {
    number: "'${label}' in not valid number!",
  },
  number: {
    range: '${label} must be between ${min} and ${max}!',
  },
}
export default function AddAssetForm({ onClose }) {
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [total, setTotal] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form] = Form.useForm()

  const assetRef = useRef()
  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
      total: values.total,
    }

    assetRef.current = newAsset
    addAsset(newAsset)
    setSubmitted(true)
  }
  function handleAmountChange(value) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    })
  }
  function endOfWord(num) {
    let result
    let string = num.toString()
    let lastChar = string.charAt(string.length - 1)
    if (lastChar == '1' && !(num == 11)) {
      result = 'a'
    } else if (lastChar == '2' && !(num == 12)) {
      result = 'ы'
    } else if (lastChar == '3' && !(num == 13)) {
      result = 'ы'
    } else if (lastChar == '4' && !(num == 14)) {
      result = 'ы'
    } else {
      result = ''
    }
    return result
  }
  if (submitted) {
    return (
      <Result
        status="success"
        title="Новая валюта добавлена!"
        subTitle={`Добавлено ${assetRef.current.amount} криптовалют${endOfWord(
          assetRef.current.amount
        )} ${coin.name} по цене $${assetRef.current.price}.     
        `}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Закрыть
          </Button>,
        ]}
      />
    )
  }
  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Выберите валюту"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
          ...coin,
        }))}
        optionRender={(option) => (
          <Space>
            <img width="20px" src={option.data.icon} alt={option.data.label} />{' '}
            {option.data.label}
          </Space>
        )}
      />
    )
  } else
    return (
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: +coin.price.toFixed(5),
        }}
        onChange={(e) => {
          setTotal(
            isNaN(+(e.target.value * coin.price).toFixed(2))
              ? 0
              : +(+e.target.value * coin.price).toFixed(2)
          )
        }}
        onFinish={onFinish}
      >
        <CoinInfo coin={coin} />
        <Divider />

        <Form.Item
          label="Количество"
          name="amount"
          rules={[
            {
              required: true,
              validateMessages: { validateMessages },
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Введите количество"
            onChange={handleAmountChange}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Цена" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Дата и время" name="date">
          <DatePicker placeholder="Выберите дату" showTime />
        </Form.Item>
        <Form.Item label="Общая сумма" name="total">
          <InputNumber
            value={total}
            disabled
            style={{ width: '100%' }}
            placeholder={total}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    )
}
