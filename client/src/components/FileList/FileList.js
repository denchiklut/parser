import React, { Component } from 'react'
import './FileList.css'

class FileList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: this.props.files
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.files !== nextProps.files) {
            this.setState({customers: nextProps.files})
        }

    }

    render() {
        return (
            <div>
                <h2>Files</h2>
                <ul>
                    {this.state.customers.map(customer =>
                        <li>{customer} </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default FileList
