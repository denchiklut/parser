import React, { Component } from 'react'
import './Log.css'

class Log extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logs: this.props.logs
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.logs !== nextProps.logs) {
            this.setState({logs: nextProps.logs})
        }

    }

    render() {
        return (
            <div>
                <h2>Logs</h2>
                <ul>
                    {this.state.logs.map(log =>
                        <li>{log} </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Log
