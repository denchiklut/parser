import React from 'react';
import Home from "../Home/Home";
import Archive from "../Archive/Archive";
import Settings from "../Settings/Settings";
import Instruction from "../Instruction/Instruction";

import {Switch, Route} from 'react-router-dom'

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/archive" component={Archive} />
        <Route path="/settings" component={Settings} />
        <Route path="/instructions" component={Instruction} />
    </Switch>
);

export default Main;