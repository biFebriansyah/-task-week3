
import { Item, Input, View, Button, Text, Label } from 'native-base';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getCompany, getEngineer, getCompany2, getEngineer2 } from '../../public/Redux/Actions/User';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import DataForm from 'form-data';


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            role: '',
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
        this.dataUser = new DataForm()
        this.setData = this.setData.bind(this);
    }

    async setDatauser(username) {

        if (this.state.role === 2) {
            await this.props.setDataEngineer(username);
        }
        if (this.state.role === 1) {
            await this.props.setDataCompany(username);
        }
    }

    setData() {
        this.dataUser.append('username', this.state.username);
        this.dataUser.append('password', this.state.password);
    }

    login() {

        this.setData()
        axios({
            method: 'post',
            url: 'http://192.168.1.17:4000/login',
            headers: { 'Content-Type': 'application/json' },
            data: this.dataUser

        }).then(res => {
            const result = res.data.result[0]
            this.setState({ role: result.role })
            this.setDatauser(this.state.username);
            Actions.navigation()
        }).catch(err => {
            if (err.response) {
                const result = err.response.data.result
                console.log(result);
            }
            if (err.request) {
                return console.log(err.request)
            }
            else {
                return console.log('unknown err ' + err)
            }
        })
    }

    onSubmit() {
        this.login()
        console.log(this.props);
    }

    goRegis() {
        Actions.Register()
    }
    render() {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
                        <Text style={{ fontSize: 40 }}>Welcome</Text>
                        <Text style={{ fontSize: 20 }}>Hiring Mobile</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 40 }}>
                        <View style={{ marginTop: 20, marginBottom: 10 }}>
                            <Item floatingLabel >
                                <Label>Username</Label>
                                <Input
                                    name='username'
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({ username })}
                                />
                            </Item>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 40 }}>
                            <Item floatingLabel >
                                <Label>Password</Label>
                                <Input secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                        </View>
                        <View>
                            <Button rounded primary style={{ justifyContent: "center", }} onPress={this.onSubmit} >
                                <Text>Sign In</Text>
                            </Button>
                            <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ marginRight: 5 }}>Don't Have Account?</Text>
                                <Text style={{ color: '#0A60FF', textTransform: "lowercase", color: 'blue' }} onPress={this.goRegis}>Register here</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}

const mapDispatchToPropps = (dispatch) => {

    return {
        setDataEngineer: bindActionCreators(getEngineer2, dispatch),
        setDataCompany: bindActionCreators(getCompany2, dispatch)
    };
}

export default connect(null, mapDispatchToPropps)(Login);
