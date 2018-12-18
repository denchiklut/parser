import React, { Component } from 'react'
import './Log.css'
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

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
                <AppBar style={{background: '#f5f5f5c9'}} position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6">
                            Logs
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ul className='LogList'>
                    {this.state.logs.map(log =>
                        <li>{log} </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Log
