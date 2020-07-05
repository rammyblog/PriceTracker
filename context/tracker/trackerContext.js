import { createContext, useReducer, useCallback, useEffect } from "react"
import priceTrackerApi from "../../api/apiUtils"
import * as types from "./trackerTypes"
import { TrackerReducer, initalTrackerState } from "./trackerReducer"

export const TrackerContext = createContext(initalTrackerState)

export const TrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TrackerReducer, initalTrackerState)

  const getAllUserItems = useCallback(async () => {
    try {
      dispatch({
        type: types.TRACKER_START,
      })
      let res = await priceTrackerApi.get(`api/items`)
      dispatch({
        type: types.TRACKER_SUCCESS,
        payload: res.data,
      })
      console.log(res)
    } catch (e) {
      dispatch({
        type: types.TRACKER_FAILURE,
        payload: "An error occured",
      })
      console.log({ e })
    }
  }, [])

  useEffect(() => {
    getAllUserItems()
  }, [])

  const deleteItem = async (id) => {
    try {
      const res = await priceTrackerApi.delete(`api/items/${id}`)
      console.log(res)
    } catch (error) {
      dispatch({
        type: types.TRACKER_FAILURE,
        payload: "An error occured",
      })
    }

    dispatch({
      type: types.ITEM_DELETE,
      payload: id,
    })
  }

  return (
    <TrackerContext.Provider value={{ state, deleteItem }}>
      {children}
    </TrackerContext.Provider>
  )
}
