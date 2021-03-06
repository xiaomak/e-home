import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Home from './View/Home/Home';
import Report from './View/Report/Report';
import DetailList from './View/DetailList/DetailList';
import Details from './View/Details/Details';
import NoMatch from './View/NoMatch/NoMatch';
import Admin from './View/Admin/Admin';
import Warn from './View/Warn/Warn';
import './style.less';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // 模拟异步。
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/warn',
                state: { from: props.location }
            }}/>
        )
    )}/>
);


class App extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="container" id="container">
                <Router basename="/e-home/build/">
                    <div className="body">
                        <Route render={({ location }) => (
                            <ReactCSSTransitionGroup
                                transitionName="fade"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                            >
                                <Switch key={location.key} location={location}>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/report" component={Report}/>
                                    <Route path="/details" component={Details}/>
                                    <Route path="/detail_list" component={DetailList}/>
                                    <Route path="/warn" component={Warn}/>
                                    <PrivateRoute path="/admin" component={Admin}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </ReactCSSTransitionGroup>
                        )}/>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
