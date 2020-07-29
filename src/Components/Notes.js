
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
    Switch
    
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Edit_Note from './Edit_note';
const d_width = Dimensions.get('window').width;
const d_height = Dimensions.get('window').height;



@inject('commonStore')
@observer
export default class Authorization extends Component {

    static navigationOptions = {
        header: null,
        headerLeft: null
    
    };

    constructor(props) {
        super(props);
        this.state = {
            noteEditing: false,
            editingNoteIndex: null,
            editingNoteObject: null,
        }
    }
   
    openModal(note,index){
        this.setState({editingNoteIndex: index, editingNoteObject: note}, () => {
            this.setState({noteEditing: true});
        })
    }

    componentDidMount() {
        this.props.commonStore.getNotes();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,alignItems: 'center',backgroundColor: 'yellow'}}>
                {this.state.noteEditing?
                    <Edit_Note 
                        editingNoteObject={this.state.editingNoteObject} 
                        editingNoteIndex={this.state.editingNoteIndex}
                        closeModal={() => this.setState({noteEditing: false})}
                        visible={this.state.noteEditing}
                    />
                   : 
                    null
                }
                <TouchableOpacity
                    onPress={() => this.props.commonStore.addNote().then(res => this.openModal({...res, title: '', body: ''}, this.props.commonStore.notes.length - 1))} 
                    style={{alignSelf: 'flex-end', margin: 10,width: 30, height: 30, ackgroundColor: 'white',borderRadius: 100}}
                >
                    <Text style = {{textAlign: 'center', marginTop: 'auto',marginBottom: 'auto', fontSize: 20,fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.props.commonStore.notes.map((item,index) => {
                        return(
                            <View style = {{minWidth: d_width - 20}}>
                                <View style = {{backgroundColor: 'white',margin: 5,padding: 10}}>
                                    <Switch
                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={item.done ? '#f5dd4b': '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    value={item.done}
                                    onValueChange = {() => this.props.commonStore.changeNote({id:item.id,done:!item.done,title: item.title,body: item.body},index)}
                                    style={{transform: [{ scaleX: .6 }, { scaleY: .6 }], position: 'absolute', top: 0, right: 0}}
                                    />
                                    <Text style={{fontWeight: '800',fontSize: 18,color: 'black'}}>{item.title} </Text>
                                    <Text style={{fontWeight: '200',fontSize: 14,padding: 30,marginBottom: 5,color: 'black'}}>{item.body}</Text>
                                </View>
                                <View style = {{position: 'absolute', height: 15, bottom: 10, right: 20, flexDirection: 'row'}}>
                                    <TouchableOpacity onPress = {() => this.openModal(item,index)}>
                                        <Text style = {{marginRight: 5, color: 'blue'}}>
                                            Изменить
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.commonStore.deleteNote(item.id)}>
                                        <Text style = {{marginRight: 5, color: 'red'}}>
                                            Удалить
                                        </Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        );      
    }
}

  