
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Auth_Inputs from './Auth_Inputs'
const d_width = Dimensions.get('window').width;
const d_height = Dimensions.get('window').height;


@inject('authStore')
@observer
export default class Authorization extends Component {

    static navigationOptions = {
        header: null,
        headerLeft: null
    
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }
   

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.props.authStore.reset();
        });
    }

    render() {
        return (
            <KeyboardAvoidingView 
                behavior='postition' 
                keyboardVerticalOffset={200} 
                style={{flex: 1, backgroundColor:'yellow', justifyContent: 'center', padding: 20, paddingBottom: 120}}
            >
                    <View style={{backgroundColor: 'white', padding: 20}}>
                    <Auth_Inputs></Auth_Inputs>
                    { this.props.authStore.loginError ? <Text style={{margin: 10, color: 'red',alignSelf: 'center'}}>{this.props.authStore.loginError}</Text> : null }
                    </View>
                    <TouchableOpacity
                        onPress={() => {this.props.authStore.login().then(() => {
                            !this.props.authStore.loginError ? this.props.navigation.replace('DrawerNavigator') : null;
                        })}} 
                        style={{alignSelf: 'stretch' , height: 40, marginTop: 5, marginBottom: 5, backgroundColor: 'white'}}
                    >
                        <Text style={{textAlign: 'center', color: 'blue', marginBottom: 'auto', marginTop: 'auto'}}>Войти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.authStore.reset();
                            this.props.navigation.push('Registration')
                        }} 
                        style={{alignSelf: 'stretch', height: 40, marginTop: 5, marginBottom: 5, backgroundColor: 'white'}}
                    >
                        <Text style={{textAlign: 'center', color: 'blue', marginBottom: 'auto', marginTop: 'auto'}}>Зарегистрироваться</Text>
                    </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

