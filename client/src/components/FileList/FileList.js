import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './FileList.css'
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import FolderIcon from '@material-ui/icons/Folder';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class FileList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: this.props.files,
            checked: [1],
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.files !== nextProps.files) {
            this.setState({files: nextProps.files})
        }

    }

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Файлы урлов
                    </Typography>
                    <div style={{background: 'rgba(255, 255, 255, 0.5)'}}>
                        <List dense>
                            {this.state.files.map(file =>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={file}
                                        secondary='Число урлов'
                                    />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onChange={this.handleToggle(file)}
                                            checked={this.state.checked.indexOf(file) !== -1}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>
            </div>)
    }
}
FileList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(FileList)
