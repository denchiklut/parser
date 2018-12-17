import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Main from '../Main/Main'
import { Link } from 'react-router-dom';
import './App.css'
import Hidden from "@material-ui/core/Hidden";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = {
    list: {
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class App extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                        <ListItemText>
                            <Link className='App-link' style={{color: '#1e1e1e'}} to="/"><h1>Главная</h1></Link>
                        </ListItemText>
                    </ListSubheader>}>
                    <ListItem button>
                        <ListItemText >
                            <Link className='App-link'  style={{color: '#1e1e1e'}} to="/archive">Архив</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            <Link className='App-link' style={{color: '#1e1e1e'}} to="/settings">Настройки</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            <Link className='App-link'  style={{color: '#1e1e1e'}} to="/instructions">Инструкции</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <AppBar position="static" style={{background: 'linear-gradient(to right, #dc2430, #7b4397)'}}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/">Cian Parser</Link>
                        </Typography>
                        <Hidden smDown>
                            <Link className='App-link' to="/archive">Архив</Link>
                            <Link className='App-link' to="/settings">Настройки</Link>
                            <Link className='App-link' to="/instructions">Инструкции</Link>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
                <Main/>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);