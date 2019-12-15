import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { FlatGrid } from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }
    getData() {
        axios({
            method: 'get',
            url: 'http://192.168.1.18:4000/engineer'
        }).then(res => {
            let result = res.data.result[0];
            this.setState({
                data: result
            })
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

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <FlatGrid
                            itemDimension={90}
                            items={this.state.data}
                            style={styles.gridView}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.itemContainer} onPress={() => { Actions.Profile({ username: item.username }) }}>
                                    <Image source={{ uri: item.photo }} style={{ flex: 1, borderRadius: 5 }} />
                                    <View style={styles.name} >
                                        <Text style={{ color: '#fff' }}>{item.name}</Text>
                                        <Text style={{ color: '#fff' }}>{item.location}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    name: {
        position: 'absolute',
        color: '#fff',
        paddingLeft: 5,
        paddingBottom: 10
    },

    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 100,
        height: 200,
        position: 'relative'
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});





export default Home
