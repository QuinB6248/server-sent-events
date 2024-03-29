import React, { Component } from 'react'
import * as request from 'superagent'
import { connect} from 'react-redux'
import { fetchMessages } from './actions/messages'

class App extends Component {
  state = {
    messages: [],
    message: ''
  }

  url = 'http://localhost:5000'//'https://young-anchorage-56792.herokuapp.com'

  source = new EventSource(`${this.url}/stream`)
// //handle new events
//   onEvent = (event) => {
//     const { data } = event
//     const messages = JSON.parse(data) // turns string into data
//     console.log('messages test:', messages)
//     this.setState({messages}) //overwrite messages from the state
//   }
  //Connect the source to the handler componentDidMount

  componentDidMount () {
    this.source.onmessage = this.props.fetchMessages //when source receives new event pass it to onEvent
  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({
      message: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { message } = this.state
    this.setState({message: ''})
    
    request
      .post(`${this.url}/message`)
      .send({message})
      .then(response => {
        console.log('responsetest: ', response)
      })
      .catch(console.error)
  }

  render() {
    console.log('this.props test:', this.props)
    const messages =
      this
        .props //action
        .messages
        .map((message, index) => <p key={index}>{message.message}</p>)

    return <main>
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.message}
          onChange={this.onChange}
          type='text'
        />
        <button>send</button>
      </form>

      {messages}
    </main>
  }
}

function mapStateToProps (state) {
  const {messages} = state
  return {
    messages
  }
}
const mapDispatchToProps = {fetchMessages}

export default connect(mapStateToProps,mapDispatchToProps)(App)