import { MESSAGES_FETCHED } from '../actions/messages'

const initialState = []

export default function messages (state = initialState, {type, payload}) {
  switch (type) {
    case MESSAGES_FETCHED:
      return payload
    default:
      return state
  }

}