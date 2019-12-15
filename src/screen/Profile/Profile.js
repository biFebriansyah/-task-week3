import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Button } from 'native-base'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            username: this.props.username
        }
        this.getData = this.getData.bind(this);
        this.goHire = this.goHire.bind(this);
    }

    goBack() {
        Actions.pop()
    }

    getData() {
        const username = this.props.username
        axios({
            method: 'get',
            url: 'http://192.168.1.18:4000/engineer/' + this.state.username
        }).then(res => {
            let result = res.data.result[0][0];
            this.setState({ data: result })
        }).catch(err => {
            if (err.response) {
                return console.log(err.response.data.result[0])
            }
            if (err.request) {
                return console.log('error from request', err.request);
            }
            else {
                console.log(err)
            }
        })
    }

    goHire() {
        Actions.Hirings({ engineer: this.state.username })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const data = this.state.data
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleBar}>
                        <TouchableOpacity onPress={this.goBack}><Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons></TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={{ uri: data.photo }} style={styles.image} resizeMode="center"></Image>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.name}</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Ui/Ux Designer</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>80</Text>
                            <Text style={[styles.text, styles.subText]}>Rate</Text>
                        </View>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                            <Text style={[styles.text, styles.subText]}>Project Finish</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                            <Text style={[styles.text, styles.subText]}>Project</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300, flex: 1 }}>
                        <Button rounded style={{ justifyContent: 'center', backgroundColor: '#bbb', width: 150 }} onPress={this.goHire} >
                            <Text style={styles.text}>Hire Me</Text>
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        width: null,
        height: 200,
        borderRadius: 100,
        resizeMode: 'contain'
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        overflow: "hidden"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    }
});


export default Profile