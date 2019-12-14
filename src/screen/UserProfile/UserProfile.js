import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base'
import { connect } from 'react-redux';
import { logoutUser } from '../../public/Redux/Actions/auth'

class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={{ uri: this.props.dataUser.photo }} style={styles.image} resizeMode="center"></Image>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.props.dataUser.name}</Text>
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
                        <Button rounded style={{ justifyContent: 'center', backgroundColor: '#bbb', width: 150 }} onPress={this.logOut}>
                            <Text style={styles.text}>Logout</Text>
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

const mapStateToProps = state => {
    return {
        dataUser: state.data.userData
    }
}

export default connect(mapStateToProps)(UserProfile)