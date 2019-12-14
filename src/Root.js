import React, { Component } from 'react'
import Routes from './components/Routes/Routes';
import { connect } from 'react-redux';
import Navigation from './screen/Navigation/Navigation';

class Root extends Component {
    render() {
        if (this.props.dataUser.name) {
            return (
                <Routes login={true} />
            )
        } else {
            return (
                <Routes login={false} />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        dataUser: state.data.userData
    }
}

export default connect(mapStateToProps, null)(Root)