import React, { useState, useContext } from "react"
import { InputNumber, Modal, Form, Input, Alert } from "antd"
import { TrackerContext } from "../../../context/tracker/trackerContext"

const ItemForm = ({ visible, onCreate, onCancel, mode, initialData }) => {
  const [form] = Form.useForm()

  const { createItem, state } = useContext(TrackerContext)

  const handleCreateItem = (values) => {
    if (values.url.includes("jumia")) {
      values.store = "JM"
    } else {
      values.store = "KO"
    }
    createItem(values)
  }

  const handleClose = () => {
    console.log("ee")
  }
  return (
    <Modal
      visible={visible}
      title="Create a new Item"
      confirmLoading={state.loading}
      okText="Create"
      destroyOnClose
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields()
            handleCreateItem(values)
            // onCreate(values)
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}
    >
      {" "}
      {state.errResponse ? (
        <Alert
          message="Error"
          description={state.errResponse}
          type="error"
          showIcon
          closable
          afterClose={handleClose}
        />
      ) : null}
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{
        //   modifier: "public",
        // }}
      >
        <Form.Item
          name="url"
          label="Product URL"
          rules={[
            {
              required: true,
              message: "Please input the url of the product!",
            },
            {
              type: "url",
              message:
                "Enter a valid url, i.e(https://www.jumia.com.ng/oraimo-compact-10000mah-ultra-slim-fast-charging-power-bank-42974768.html)",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value.includes("jumia") || value.includes("konga")) {
                  return Promise.resolve()
                }

                if (value) {
                  return Promise.reject(
                    "We only support Jumia and Konga, Ensure the url is from either of these stores"
                  )
                }
                return
              },
            }),
          ]}
        >
          <Input type="url" />
        </Form.Item>
        <Form.Item
          name="requested_price"
          label="Requested price"
          rules={[
            {
              required: true,
              message: "Please input the price you are tracking for!",
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\₦\s?|(,*)/g, "")}
            min={10}
            defaultValue={3}
            style={{ width: "100%" }}
          />
          {/* <Input type="number" /> */}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ItemForm
