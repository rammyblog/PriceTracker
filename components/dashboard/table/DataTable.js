import React, { useState, useContext } from "react"
import { Table, Input, InputNumber, Popconfirm, Form } from "antd"
import "./DataTable.less"
import { TrackerContext } from "../../../context/tracker/trackerContext"

const originData = []

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const EditableTable = () => {
  const [form] = Form.useForm()

  const { state } = useContext(TrackerContext)
  const { data: itemData } = state
  const [data, setData] = useState(itemData)
  console.log(data)

  const [editingKey, setEditingKey] = useState("")

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey("")
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey("")
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }

  //   {
  //     "id": 2,
  //     "title": "Slim Regular Jeans For Men - Blue",
  //     "url": "https://www.konga.com/product/slim-regular-jeans-for-men-blue-3538616",
  //     "requested_price": 5000,
  //     "last_price": 5000,
  //     "discount_price": "DISCOUNT! The price is 5000",
  //     "store": "KO",
  //     "created_at": "2020-06-25T16:44:52.718404Z",
  //     "updated_at": "2020-06-25T17:16:05.888514Z",
  //     "owner": 1
  // }

  const columns = [
    {
      title: "Item Name",
      dataIndex: "title",
      width: "25%",
      editable: true,
    },
    {
      title: "url",
      dataIndex: "url",
      width: "15%",
      editable: true,
    },
    {
      title: "Requested price",
      dataIndex: "requested_price",
      width: "10%",
      editable: true,
    },
    {
      title: "Last Retrieved price",
      dataIndex: "last_price",
      width: "15%",
      editable: true,
    },
    {
      title: "Updated at ",
      dataIndex: "updated_at",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

export default EditableTable
