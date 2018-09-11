import React from 'react'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 1
    }
    this.add = this.add.bind(this)
  }
  add () {
    this.setState({
      a: 2
    })
  }
  render() {
    return (
      <div>This ab  is {this.state.a} <button onClick={this.add}>加一</button></div>
    )
  }
}