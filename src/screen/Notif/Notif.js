import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import moment from 'moment';

class Notif extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            style: styles.create,
            userData: {
                username: this.props.dataUser.username
            }
        }
        this.getData = this.getData.bind(this);
    }

    getData() {

        if (this.props.dataUser.skill) {
            axios({
                method: 'get',
                url: 'http://192.168.1.17:4000/project/engineer/' + this.state.userData.username,
                headers: { 'Content-Type': 'application/json' },
                data: this.state.userData

            }).then(res => {
                const result = res.data.result[0]
                this.setState({ data: result })
                console.log(result);
                this.setState({ style: styles.hide })
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
        } else {
            return
        }
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack} style={styles.hide} onPress={this.test}>
                        <Ionicons name="md-add-circle" size={20} color="#52575D"></Ionicons>
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Create</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.conten}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity>
                                <View style={styles.listItem}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: "bold" }}>{moment
                                            .utc(item.estimasi)
                                            .format("LLLL")}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 5,
        backgroundColor: '#bbb'
    },
    create: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: '#fff',
        width: 105,
        padding: 5,
        borderRadius: 10,
    },
    hide: {
        display: 'none'
    },
    conten: {
        flex: 1,
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
})

const mapStateToProps = state => {
    return {
        dataUser: state.data.userData
    }
}

export default connect(mapStateToProps)(Notif)