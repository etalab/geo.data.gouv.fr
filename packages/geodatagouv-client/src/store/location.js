// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// Actions
// ------------------------------------
export const locationChange = (location = '/') => ({
  type: LOCATION_CHANGE,
  payload: location
})

// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// Reducer
// ------------------------------------
export default function locationReducer(state = {}, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}
