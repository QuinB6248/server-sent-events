import request from 'superagent'

const url = 'http://localhost:5000' //'https://young-anchorage-56792.herokuapp.com'


export const MESSAGES_FETCHED = 'MESSAGES_FETCHED'

const messagesFetched = messages => ({
  type:  MESSAGES_FETCHED,
  payload: messages
})

export const fetchMessages = (event) => (dispatch, getState) => {
  console.log('event.data test:', event.data)

  const messages = JSON.parse(event.data)

  console.log('messages test:', messages)
  dispatch(messagesFetched(messages))

  // if (getState().messages) return

  // request(`${url}/message`)
  //   .then(response => {
  //     dispatch(messagesFetched(response.body))
  //   })
  //   .catch(console.error)
}


// export function onEvent (event) {
//   const { data } = event
//   const messages = JSON.parse(data) // turns string into data
//   console.log('messages test:', messages)
//   return {
//     type: EVENT,
//     payload: messages
//   }
// }



