import React, { Component } from 'react'

class HelloWorldClass extends Component{
    render(){
        return(
                <h1>
                    Hola {this.props.name}
                </h1>
            )
    }
}
export default HelloWorldClass