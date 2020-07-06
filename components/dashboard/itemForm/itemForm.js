import React, { useState, useContext, useEffect } from "react"
import { InputNumber, Modal, Form, Input, Alert } from "antd"
import { TrackerContext } from "../../../context/tracker/trackerContext"

const ItemForm = ({ visible, onCreate, onCancel, mode, initialData }) => {
  const [form] = Form.useForm()

  const { createItem, state, editItem, trackerReset } = useContext(
    TrackerContext
  )

  const determineStore = (url) => {
    if (url.includes("jumia")) {
      return "JM"
    }
    return "KO"
  }

  const handleCreateItem = async (values) => {
    if (mode === "edit") {
      return handleEditItem(values)
    }

    values.store = determineStore(values.url)

    if (await createItem(values)) {
      onCreate()
    }
  }

  const handleEditItem = async (values) => {
    if (
      values.url === initialData.url &&
      values.requested_price === initialData.requested_price
    ) {
      return onCreate()
    }
    const id = initialData.id
    values.store = determineStore(values.url)

    if (await editItem(id, values)) {
      onCreate()
    }
  }

  const handleClose = () => {
    console.log(trackerReset())
    console.log("on close")
    onCreate()
  }

  return (
    <Modal
      visible={visible}
      title={
        mode === "edit" ? `Edit ${initialData.title}` : "Create a new Item"
      }
      confirmLoading={state.loading}
      okText={mode === "edit" ? "Edit" : "Create"}
      destroyOnClose
      cancelText="Cancel"
      onCancel={handleClose}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields()
            handleCreateItem(values)
            // onCreate()
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
        initialValues={initialData}
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
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ItemForm
