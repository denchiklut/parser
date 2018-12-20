import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios'
import './Home.css'
import FileList from "../FileList/FileList"
import Log from "../Log/Log"
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            isStart: false,
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
            console.log('logs', this.state.logs)
        }

    }

    componentDidMount() {
        axios
            .get('/api/status')
            .then(res => {
                this.setState({isStart: res.data.data[0].status})
            })

        axios
            .get('/api/logs')
            .then(res => {
                if (res.data.data.length > 0 ) {
                    res.data.data.forEach(item => {
                        this.setState({logs: [...this.state.logs, item.log]});
                    })
                }
            })

        axios
            .get('/api/logFile')
            .then(res => {
                if (res.data.data.length > 0 ) {
                    res.data.data.forEach(item => {
                        let obj = {title: item.title, count: item.size}
                        this.setState({files: [...this.state.files, obj]});
                    })
                }
            })
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

                if (log === true) {
                    this.setState({logs: ['We are starting parser']})
                    this.setState({files: []})
                }
            })
    }
}

export default Home
