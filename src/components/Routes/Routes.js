import React, { Component } from 'react';
import Login from '../../screen/Login/Login';
import Home from '../../screen/Home/Home';
import Registers from '../../screen/Register/Register';
import Test from '../../test/Test';
import Profile from '../../screen/Profile/Profile';
import Hire from '../../components/Hire/Hire';
import Navigation from '../../screen/Navigation/Navigation';
import Add from '../../screen/Project/add';
import Project from '../../screen/Project/Project';
import Hirings from '../../screen/hiring/Hiring';
import { Router, Scene } from 'react-native-router-flux';

export default class Routes extends Component {

    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Scene key='app' hideNavBar initial={this.props.login}>
                        <Scene hideNavBar
                            key='Home'
                            component={Home}
                            back={false}
                        />
                        <Scene hideNavBar
                            key='navigation'
                            component={Navigation}
                            initial
                        />
                        <Scene hideNavBar
                            key='Profile'
                            component={Profile}
                        />
                        <Scene hideNavBar
                            key='HireModal'
                            component={Hire}
                        />
                        <Scene hideNavBar
                            key='AdModal'
                            component={Add}
                        />
                        <Scene hideNavBar
                            key='Project'
                            component={Project}
                        />
                        <Scene hideNavBar
                            key='Hirings'
                            component={Hirings}
                        />
                        <Scene hideNavBar
                            key='test'
                            component={Test}
                        />
                    </Scene>
                    <Scene key='auth' initial={!this.props.login}>
                        <Scene hideNavBar
                            key='Register'
                            component={Registers}
                        />
                        <Scene hideNavBar
                            key='Login'
                            component={Login}
                            initial
                        />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
