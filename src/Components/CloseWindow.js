
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
import { ThemeColors } from 'react-navigation';

export default CloseWindow = (props) => {
    return(
        <Modal animationType='slide' transparent={true} visible={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'yellow', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: 'grey' }}>
                    <Text style={{ fontWeight: 'bold' }}>Выйти без сохранения?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity>
                            <Text>Да</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, borderColor: 'black', borderWidth: 1 }}></View>
                        <TouchableOpacity>
                            <Text>Нет</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}