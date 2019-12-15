import React, { Component } from 'react';
import FormData from 'form-data';
import { Item, Input, View, Button, Text, DatePicker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';


class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.dataUser.username,
            name: '',
            description: "",
            time: new Date(),
        }
        this.setDate = this.setDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.DataForm = new FormData();
        this.setData = this.setData.bind(this);
        this.savProject = this.savProject.bind(this);
    }

    setData() {
        this.DataForm.append('username', this.state.username);
        this.DataForm.append('name', this.state.name);
        this.DataForm.append('description', this.state.description);
        this.DataForm.append('time', this.state.time);
    }

    setDate(newDate) {
        this.setState({ time: newDate });
    }

    savProject() {
        this.setData()
        axios({
            method: 'post',
            url: 'http://192.168.1.18:4000/project',
            headers: { 'Content-Type': 'application/json' },
            data: this.state
        }).then(res => {
            const result = res.data;
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
        this.savProject()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 40 }}>Create Project</Text>
                </View>
                <View style={{ flex: 2, marginHorizontal: 30 }}>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Item inlineLabel style={{}}>
                            <Input placeholder='Project Name'
                                onChangeText={value => this.setState({ name: value })}
                            />
                        </Item>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Item inlineLabel style={{}}>
                            <Input placeholder='Description'
                                onChangeText={value => this.setState({ description: value })}
                            />
                        </Item>
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 30 }}>
                        <Item inlineLabel style={{}}>
                            {/* <DatePicker
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select Estimated Deadline"
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "#706f6f" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            /> */}
                            <DatePicker
                                onDateChange={this.setDate}
                                androidMode={'default'}
                            />
                        </Item>
                    </View>
                    <View>
                        <Button rounded primary style={{ justifyContent: "center", }} onPress={this.onSubmit} >
                            <Text>Save</Text>
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

export default connect(mapStateToProps)(Add)