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
    // try {
    //   const res = await priceTrackerApi.delete(`api/items/${id}`)
    //   console.log(res)
    // } catch (error) {
    //   dispatch({
    //     type: types.TRACKER_FAILURE,
    //     payload: "An error occured",
    //   })
    // }

    dispatch({
      type: types.ITEM_DELETE,
      payload: id,
    })
  }

  const createItem = async (data) => {
    try {
      dispatch({
        type: types.TRACKER_START,
      })
      const res = await priceTrackerApi.post(`api/items/`, data)
      console.log(res)
      dispatch({
        type: types.ITEM_CREATE,
        payload: res.data,
      })
    } catch (error) {
      console.log({ error })

      dispatch({
        type: types.TRACKER_FAILURE,
        payload: error.response.data || "An error occured",
      })
    }
  }

  const getSingleItem = (id) => {
    return state.data.slice().filter((item) => item.id == id)
  }

  return (
    <TrackerContext.Provider
      value={{ state, deleteItem, createItem, getSingleItem }}
    >
      {children}
    </TrackerContext.Provider>
  )
}
