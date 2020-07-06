import React, { useState } from "react"
import { Button, Modal, Form, Input, Radio } from "antd"
import ItemForm from "./itemForm"

const CreateItemButton = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = () => {
    setVisible(false)
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        New Item
      </Button>
      <ItemForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default CreateItemButton
