import react from "react"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import "./CardEdit.less"
const handleEditClick = (id) => {
  console.log(id)

  console.log("edit")
}

const handleDeleteClick = () => {
  console.log("delete")
}

const CardEdit = ({ id }) => (
  <>
    <div className="edit-icons">
      <EditOutlined className="edit-icon" onClick={() => handleEditClick(id)} />
      <DeleteOutlined
        className="delete-icon"
        onClick={() => handleDeleteClick(id)}
      />
    </div>
  </>
)

export default CardEdit
