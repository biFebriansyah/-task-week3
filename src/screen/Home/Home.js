import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios';
import { FlatGrid } from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import { ListItem, SearchBar } from 'react-native-elements';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loding: false,
            data: []
        }
        this.arrayholder = [];
    }

    getData() {
        this.setState({ loding: true })
        axios({
            method: 'get',
            url: 'http://192.168.1.18:4000/engineer'
        }).then(res => {
            let result = res.data.result[0];
            this.setState({
                data: result
            })
            this.arrayholder = result
            this.setState({ loding: false })
        }).catch(err => {
            if (err.response) {
                this.setState({ loding: false })
                return console.log(err.response.data.result[0])
            }
            if (err.request) {
                this.setState({ loding: false })
                return console.log('error from request', err.request);
            }
            else {
                this.setState({ loding: false })
                console.log(err)
            }
        })
    }

    componentDidMount() {
        this.getData()
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.skill.toUpperCase()} ${item.location.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {
        if (this.state.loding) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
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

                            keyExtractor={item => item.username}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListHeaderComponent={this.renderHeader}
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
