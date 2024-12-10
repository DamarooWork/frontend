import { Layout, Space, Select, Button, Modal, Drawer, DatePicker } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export default function Header() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [isModalOpen, setModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { crypto } = useCrypto()
  useEffect(() => {
    function keypress(e) {
      if (e.key === '/') setSelect((prev) => !prev)
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  })
  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="Нажмите / для открытия"
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
      <Button size="large" type="primary" onClick={() => setOpenDrawer(true)}>
        Добавить валюту
      </Button>
      <Modal open={isModalOpen} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Добавить валюту"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setOpenDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
