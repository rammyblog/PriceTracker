import react, { useContext } from "react"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import "./CardEdit.less"
import { TrackerContext } from "../../../context/tracker/trackerContext"

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
          <DeleteOutlined
            className="delete-icon"
            onClick={() => handleDeleteClick(id)}
          />
        )}
      </div>
    </>
  )
}

export default CardEdit
