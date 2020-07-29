
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
import Auth_Inputs from './Auth_Inputs';

const d_width=Dimensions.get('window').width;
const d_height=Dimensions.get('window').height;


@inject('authStore')
@observer
export default class Registration extends Component {

    static navigationOptions={
        header: null,
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state={
        
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='position' style={{flex: 1, backgroundColor: 'yellow', justifyContent: 'center' ,padding: 20, paddingBottom: 120}}>
                    <View style={{backgroundColor: 'white', padding: 20}}>
                    <Auth_Inputs/>
                    { this.props.authStore.registerError ? <Text style={{margin:10,color:'red',alignSelf:'center'}}>{this.props.authStore.registerError}</Text> : null }
                    </View>
                    <TouchableOpacity 
                    onPress={()=>{
                        this.props.authStore.register().then(()=>{
                            !this.props.authStore.registerError ? this.props.navigation.pop() : this.props.authStore.setPassword('');
                        });
                    }} 
                    style={{alignSelf: 'stretch', height: 40, marginTop: 5, marginBottom: 5, backgroundColor: 'white'}}
                    >
                        <Text style={{textAlign: 'center', color: 'blue', marginBottom: 'auto', marginTop: 'auto'}}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{alignSelf: 'stretch', height:40, marginTop: 5, marginBottom: 5, backgroundColor: 'white'}}>
                        <Text style={{textAlign: 'center', color: 'blue', marginBottom: 'auto', marginTop: 'auto'}}>Назад</Text>
                    </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

