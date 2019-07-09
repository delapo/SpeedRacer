import React, { Component } from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import styles from "./style";

import {Keyboard, 
        Text, 
        View, 
        TextInput, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        FlatList,
        Alert,
        AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";

export default class PointScreen extends Component {

    static navigationOptions = {
      header:null,
    };

    state = {
        Participants:[],
        unit: 'Points',
        correct : true
    }

    addParticipants(){
        this.setState({Participants: [...this.state.Participants, ""]})
    }

    removeParticipants(){
        var remove=this.state.Participants.pop()
        this.setState({Participants: this.state.Participants})
    }


    handleChange(e, index) {
        this.state.Participants[index] = e.nativeEvent.text
        this.setState({Participants: this.state.Participants})
    }

    _storeUnit = async () => {
        try{
            await AsyncStorage.setItem('unit', this.state.unit)
        } catch (error) {
            console.error(error)
        };
    }

    _storePlayer = async () => {
        try{
            await AsyncStorage.setItem('player', JSON.stringify(this.state.Participants))
        } catch (error) {
            console.error(error)
        };
    }

    checkArray() {
        const max = this.state.Participants.length
        var i = 0
        this.setState({correct: true})
        while( i < max) {
            if(this.state.Participants[i] == '') {
                this.setState({correct: false})
            }
            i++
        }
    }

    goGame = async () => {
        if ( this.state.Participants[0] == null) {
            Alert.alert(
                'Erreur',
                'Ajouter Player',
            );
        }
        else {
            await this.checkArray()
            if ( this.state.correct == false ) {
                Alert.alert(
                    'Erreur',
                    'Donner un nom aux Player',
                );
            }
            else {
                this._storeUnit()
                this._storePlayer()
                this.props.navigation.navigate('GamePoint')
            }
        }
    }

    render() {
        return(
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.HeaderGenerique}>
                <Text style={styles.logoText}>
                    <Text style={{color:'white'}}>Participants</Text>
                </Text>
            </View>
        </TouchableWithoutFeedback>
        <ScrollView>
        {
            this.state.Participants.map((participant,index)=>{
                return(
                    <View key={index}>
                        <TextInput placeholder="New Player" style={styles.NameFormTextInput} onChange={(e)=>this.handleChange(e,index)}value={participant}/>
                    </View>
                )
            })
        }
        <Button
                buttonStyle={styles.AddButton}z
                title="Add player"
                onPress={(e)=>this.addParticipants(e)}
        />
        <Button
                buttonStyle={styles.ResetButton}
                title="Remove player"
                onPress={(e)=>this.removeParticipants(e)}
        />
        <TextInput placeholder="Score unit" style={styles.NameFormTextInput} value={this.state.unit} onChange={(e) => this.setState({unit: e.nativeEvent.text})} />
        <Button
                buttonStyle={styles.ValidateButton}
                title="Validate"
                onPress={() => this.goGame() }
        />
        </ScrollView>
    </KeyboardAvoidingView>
    );
  }
}