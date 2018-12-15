import React, { Component } from 'react'
import './FileList.css'

class FileList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: this.props.files
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.files !== nextProps.files) {
            this.setState({files: nextProps.files})
        }

    }

    render() {
        return (
            <div>
                <h2>Files</h2>
                <ul>
                    {this.state.files.map(file =>
                        <li>{file} </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default FileList
