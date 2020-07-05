import react, { useContext } from "react"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import "./CardEdit.less"
import { TrackerContext } from "../../../context/tracker/trackerContext"
import { Popconfirm, Button } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"

const CardEdit = ({ id, mode }) => {
  const { deleteItem } = useContext(TrackerContext)
  const handleEditClick = (id) => {
    console.log(id)

    console.log("edit")
  }

  const handleDeleteClick = (id) => {
    console.log("delete")
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
      </div>
    </>
  )
}

export default CardEdit
