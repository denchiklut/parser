import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios'
import './Home.css'
import FileList from "../FileList/FileList"
import Log from "../Log/Log"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            isStart: false,
            log: null,
            socket: null,
            logs: [],
            files: []
        };

        this.socket = io('localhost:5000');

        this.socket.on('app', function(data){
            getFiles(data)
        });

        this.socket.on('app-url', function(data){
            getLogs(data)
        });

        const getFiles = (file) => {
            this.setState({files: [...this.state.files, file.data]});
        }

        const getLogs = (log) => {
            this.setState({logs: [...this.state.logs, log.data]});
        }

    }

    render() {
        return (
            <div className="App-body">
                <Grid container spacing={24} style={{width: '100%', margin: 0}}>
                    <Grid item xs={12}>
                        <Fab
                            variant="extended"
                            aria-label="Delete"
                            className='fab'
                            onClick={() => this.handleClick()}>
                            {this.state.isStart ? 'Stop' : 'Start'}
                        </Fab>

                        {this.state.log ? this.state.log: ''}
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Log logs={this.state.logs}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FileList files={this.state.files}/>
                    </Grid>
                </Grid>
            </div>
        )
    }

    handleClick = () => {
        this.setState({
            isStart: !this.state.isStart
        })
        axios
            .post(`/api/parser`, {status: this.state.isStart ? 'stop' : 'start'})
            .then(res => {
                let log = res.data.msg
                this.setState({log})

            })
    }

}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Home)
