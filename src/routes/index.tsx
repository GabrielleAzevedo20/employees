/* eslint-disable react/jsx-indent */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard';
import Repository from '../pages/repository';
import Formulario from '../pages/formulario/Formulario';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/funcionarios/:id" component={Repository} />
        <Route path="/formulario" component={Formulario} />
    </Switch>
);

export default Routes;
