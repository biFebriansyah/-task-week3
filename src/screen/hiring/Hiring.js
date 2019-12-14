import React, { Component } from 'react'
import FormData from 'form-data';
import { Item, Input, View, Button, Text, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

class Hires extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            selected2: undefined,
            engineer: this.props.engineer,
            Fee: '',
            userData: {
                username: this.props.dataUser.username
            }
        }
        this.getData = this.getData.bind(this);
        this.onSave = this.onSave.bind(this);
        this.DataPut = new FormData();
        this.setData = this.setData.bind(this);
    }

    setData() {
        this.DataPut.append('idProject', this.state.selected2)
        this.DataPut.append('username', this.state.engineer)
        this.DataPut.append('salary', this.state.Fee)
    }

    getData() {
        axios({
            method: 'get',
            url: 'http://192.168.1.17:4000/project/company/' + this.state.userData.username,
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            const result = res.data.result[0]
            this.setState({ data: result })
            console.log(result);
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

    onSave() {
        this.setData()
        axios({
            method: 'put',
            url: 'http://192.168.1.17:4000/project',
            headers: { 'Content-Type': 'application/json' },
            data: this.DataPut

        }).then(res => {
            const result = res.data.result[0]
            console.log(result);
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

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    componentDidMount() {
        this.getData()
        console.log(this.props)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 40 }}>Hiring Form</Text>
                </View>
                <View style={{ flex: 2, marginHorizontal: 30 }}>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >

                                {this.state.data.map((val, idx) => (
                                    <Picker.Item key={idx} label={val.name} value={val.id} />
                                ))}
                                {/* <Picker.Item label="Wallet" value="key0" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" /> */}
                            </Picker>
                        </Item>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Item inlineLabel style={{}}>
                            <Input placeholder='Postition'
                                onChangeText={value => this.setState({ description: value })}
                            />
                        </Item>
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 30 }}>
                        <Item inlineLabel style={{}}>
                            <Input placeholder='Fee'
                                onChangeText={value => this.setState({ Fee: value })}
                            />
                        </Item>
                    </View>
                    <View>
                        <Button rounded primary style={{ justifyContent: "center", }} onPress={this.onSave} >
                            <Text>Send</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataUser: state.data.userData
    }
}

export default connect(mapStateToProps, null)(Hires)