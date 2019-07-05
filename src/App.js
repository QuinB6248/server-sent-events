import React, { Component } from 'react'
import * as request from 'superagent'
import { connect} from 'react-redux'
import { onEvent } from './actions/messages'


class App extends Component {
  state = {
    messages: [],
    message: ''
  }
  source = new EventSource('http://localhost:5000/stream')
// //handle new events
//   onEvent = (event) => {
//     const { data } = event
//     const messages = JSON.parse(data) // turns string into data
//     console.log('messages test:', messages)
//     this.setState({messages}) //overwrite messages from the state
//   }
  //Connect the source to the handler componentDidMount
  componentDidMount () {
    this.source.onmessage = this.props.onEvent //when source receives new event pass it to onEvent
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
      .post('http://localhost:5000/message')
      .send({message})
      .then(response => {
        console.log('responsetest: ', response)
      })
      .catch(console.error)
  }
  
  render() {
    const messages =
      this
        .props //action
        .messages
        .map((message, index) => <p key={index}>{message}</p>)

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
const mapDispatchToProps = {onEvent}

export default connect(mapStateToProps,mapDispatchToProps)(App)