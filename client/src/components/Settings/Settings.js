import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import './Settings.css'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class Settings extends Component {
    state = {
        gilad: true,
        jason: false,
        antoine: true,
        pause: true,
        url: true,
        err: true,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div className='SettingsApp'>
                <Grid container spacing={24} style={{width: '100%', margin: 0}}>
                    <Grid item xs={12}>
                <div className="settings-body">
                    <Grid container spacing={24} style={{width: '100%', margin: 0}}>
                        <Grid item xs={12}>
                           <h2>Основные настройки приложения</h2>
                            <hr/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <FormGroup >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.gilad}
                                                onChange={this.handleChange('gilad')}
                                                value="gilad"
                                            />
                                        }
                                        label={<p className='params'>Парсить только указанные файлы</p>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.antoine}
                                                onChange={this.handleChange('antoine')}
                                                value="url"
                                            />
                                        }
                                        label={<p className='params'>Парсить опр-нное кол-во урлов</p>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.err}
                                                onChange={this.handleChange('err')}
                                                value="err"
                                            />
                                        }
                                        label={<p className='params'>Сохранять в БД логи ошибок</p>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.jason}
                                                onChange={this.handleChange('jason')}
                                                value="jason"
                                            />
                                        }
                                        label={<p className='params'>Использовать Proxy</p>}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.pause}
                                                onChange={this.handleChange('pause')}
                                                value="pause"
                                            />
                                        }
                                        label={<p className='params'>Случайные паузы</p>}
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at cum cumque delectus error facilis itaque molestiae nam nemo numquam, quas saepe sed, unde vitae. Amet aperiam exercitationem tempore.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at cum cumque delectus error facilis itaque molestiae nam nemo numquam, quas saepe sed, unde vitae. Amet aperiam exercitationem tempore.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at cum cumque delectus error facilis itaque molestiae nam nemo numquam, quas saepe sed, unde vitae. Amet aperiam exercitationem tempore.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at cum cumque delectus error facilis itaque molestiae nam nemo numquam, quas saepe sed, unde vitae. Amet aperiam exercitationem tempore.
                            </p>
                        </Grid>
                    </Grid>
                </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Settings;