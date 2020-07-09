import React, { useContext, useState } from "react"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { TrackerContext } from "../../../context/tracker/trackerContext"
import { Popconfirm } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import ItemForm from "../itemForm/itemForm"
import "./CardEdit.less"
// import ItemForm from "./itemForm"

const CardEdit = ({ id, mode }) => {
  const [modalVisible, setmodalVisible] = useState(false)
  const [editData, seteditData] = useState(null)

  const { deleteItem, getSingleItem, state } = useContext(TrackerContext)
  const handleEditClick = (id) => {
    seteditData(getSingleItem(id)[0])
    setmodalVisible(true)
  }

  const onCreate = () => {
    setmodalVisible(false)
  }

  const handleDeleteClick = (id) => {
    deleteItem(id)
  }

  return (
    <>
      <div className="edit-icons">
        {mode === "edit" ? (
          <EditOutlined
            className="edit-icon"
            onClick={() => handleEditClick(id)}
          />
        ) : (
          <Popconfirm
            title="Are you sure？"
            okText="Sure, Delete it"
            cancelText="Opps!"
            placement="leftBottom"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeleteClick(id)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined className="delete-icon" />
          </Popconfirm>
        )}
        {modalVisible ? (
          <ItemForm
            visible={modalVisible}
            onCreate={onCreate}
            onCancel={() => {
              setmodalVisible(false)
            }}
            mode="edit"
            initialData={editData}
          />
        ) : null}
      </div>
    </>
  )
}

export default CardEdit
