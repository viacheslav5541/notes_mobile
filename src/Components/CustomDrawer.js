
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Image,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    SafeAreaView
} from 'react-native';



@inject('authStore')
@observer
export default class CustomDrawer extends Component {

    static navigationOptions = {
        header:null,
        headerLeft: null
    
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }
   

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{ alignSelf: 'stretch', marginTop: 150, borderColor: 'yellow' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{this.props.authStore.values.email}</Text>
                    <Button onPress={() => this.props.navigation.replace('Authorization')} title='Выйти'></Button>
                </View>
            </SafeAreaView>
        );
    }
}

