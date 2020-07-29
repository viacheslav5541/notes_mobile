
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
    Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

@inject('authStore')
@observer
export default class Auth_Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }   
    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: this.props.authStore.loginError || this.props.authStore.registerError ? 'red' : 'blue', borderBottomWidth: 0.5, margin:20, alignSelf: 'stretch'}}
                    placeholder='Логин'
                    value={this.props.authStore.values.email}
                    onChangeText={text => this.props.authStore.setEmail(text)}
                />
                <TextInput
                    style={{height: 40,borderColor: this.props.authStore.loginError || this.props.authStore.registerError ? 'red' : 'blue', borderBottomWidth: 0.5, margin: 20, alignSelf: 'stretch'}}
                    secureTextEntry={true}
                    placeholder='Пароль'
                    numberOfLines={4}
                    value={this.props.authStore.values.password}
                    onChangeText={text => this.props.authStore.setPassword(text)}
                />
            </View>
        );
    }
}
