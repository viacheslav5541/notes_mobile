
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
    SafeAreaView,
    Switch,
    Modal,
    TextInput
    
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CloseWindow from './CloseWindow';
const d_width = Dimensions.get('window').width;
const d_height = Dimensions.get('window').height;



@inject('commonStore')
@observer
export default class Edit_Note extends Component {

    static navigationOptions = {
        header: null,
        headerLeft: null
    
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.editingNoteObject.title,
            body: this.props.editingNoteObject.body,
            isGoingBack: false
        }
    }

    isEmpty(){
        if((this.state.title === '' && this.state.body === '') || (this.state.title === ' ' && this.state.body === ' ')){
            return true
        }

        return false
    }
   
    handleBackButton() {
        if(this.state.title !== this.props.editingNoteObject.title || this.state.body !== this.props.editingNoteObject.body)
        {
            this.setState({isGoingBack:true})
        } else {
            this.props.closeModal();
        }
        if (this.isEmpty()) this.props.commonStore.deleteNote(this.props.editingNoteObject.id);
    }

    handleSendButton() {
        if(this.isEmpty()){
            this.props.commonStore.deleteNote(this.props.editingNoteObject.id);
            this.props.closeModal();
        } else { 
            this.props.commonStore.changeNote({...this.props.editingNoteObject, title: this.state.title, body: this.state.body},this.props.editingNoteIndex)
            .then(this.props.closeModal())
        }
    }
    render() {
        return (
            <Modal animationType='slide' visible={this.props.visible}>
                <Modal animationType='slide' transparent={true} visible={this.state.isGoingBack}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'yellow', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: 'grey'}}>
                            <Text style={{fontWeight: 'bold'}}>Выйти без сохранения?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                                <TouchableOpacity onPress={() => this.setState({isGoingBack: false}, () => {this.props.closeModal()})}>
                                    <Text>Да</Text>
                                </TouchableOpacity>
                                <View style={{width: 1, borderColor:'black', borderWidth: 1}}></View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.setState({isGoingBack: false})
                                    }}
                                >
                                    <Text>Нет</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, borderBottomWidth: 1, borderColor: 'grey', flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-end', width: d_width - 60, margin: 10}}>
                                <TouchableOpacity 
                                    onPress={() => this.handleBackButton()} 
                                    style={{position: 'absolute', top: 50,left: 10}}
                                >
                                    <Text>
                                        Назад
                                    </Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={{flex: 1, fontSize: 15,marginBottom: 10}}
                                    secureTextEntry={false}
                                    placeholder='Заголовок'
                                    value={this.state.title}
                                    onChangeText={(text) => this.setState({title: text})}
                                />
                                <TouchableOpacity onPress={() => this.handleSendButton()} style={{position: 'absolute', top: 50, right: 10}}>
                                    <Text>Отправить</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 6, borderBottomWidth: 1, borderColor: 'grey', flexDirection:'row', justifyContent: 'space-between', alignItems: 'flex-start', width: d_width - 60, margin: 10}}>
                                <TextInput
                                    style={{flex: 1, fontSize: 15}}
                                    secureTextEntry={false}
                                    placeholder='Ваша заметка'
                                    value={this.state.body}
                                    onChangeText={(text) => {this.setState({body: text})}}
                                />
                            </View>
                        </View>
                </View>
            </Modal>
        );      
    }
}

  