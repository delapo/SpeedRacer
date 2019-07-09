import React, { Component } from "react";
import styles from './style'
import {Container,
        Content,
        List,
        ListItem} from 'native-base';

import {Keyboard, 
        Text, 
        View, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        RefreshControl,
        TouchableOpacity,
        AsyncStorage,
        ScrollView,
        Alert } from 'react-native';
import { Button } from 'react-native-elements';
//import { ScrollView } from "react-native-gesture-handler";
import annexe from '../../annexe'
import LoginScreen from "../login/login";



export default class AccueilScreen extends Component {

    static navigationOptions = {
      header:null,
    };

    constructor(props){
        super(props)
        this.state={
            data_prive: ["Bad", "Basket","Tennis"],
            data_public: ["Piscine", "Vélo"],
            activeIndex: 0,
            indexe: 0,
            user: {name: ''},
            refreshing: false,
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
            this.setState({refreshing: false});
          });
    }

    fetchData = async() => {
        this.getPriveGame()
        this.getPublicGame()
    }

    getPublicGame() {
        const header = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.user.token
            },
        };
        fetch(annexe.ip+"getPublicGame", header)
        .then(res => res.json())
        .then(res => {console.log(res.public_games)
        this.setState({data_public: res.public_games})
    })
        .catch(error => console.error("Erreur PublicGame: ", error))
    }

    getPriveGame() {
        const header = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.user.token
            },
        };
        fetch(annexe.ip+"getPrivateGame", header)
        .then(res => res.json())
        .then(res => {console.log(res.private_games)
        this.setState({data_prive: res.private_games})
    })
        .catch(error => console.error("Erreur PrivateGame: ", error))
    }

    _recupUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({user: JSON.parse(value)})
                console.log("User: ",this.state.user.token);

            }
        } catch (error) {
            console.error("Erreur User: ",error)
        }
    };

    segmentClicked(page) {
        this.setState({ activeIndex: page});
    }

    onLogout() {
        Alert.alert(
            'Attention',
            'Do you want exit this app ?',
            [
              {text: 'Yes, I want', onPress: () => this.clearAsyncStorage()},
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
    }
    
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    componentDidMount = async () => {
        const user = await this._recupUser()
        this.getPriveGame()
        this.getPublicGame()
    }

    renderSection() {
        if(this.state.activeIndex == 0) {
            return(
        <Container>
            <Content>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />} >
                <List>
                    <ListItem itemDivider style={{backgroundColor: 'black', opacity: 0.9}}>
                        <Text style={styles.FirstLetter}>Games List</Text>
                    </ListItem>
                    {  this.state.data_public.map(data => ( <ListItem >
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('LeaderBoardGame', {id: data.id})} title="0">
                            <Text  style={styles.listItems}>{data.title} #{data.id}</Text>
                        </TouchableOpacity>
                    </ListItem>
                    ) ) }
                </List>
                </ScrollView>
            </Content>
        </Container>
            )
        }
        if(this.state.activeIndex == 1) {
           return(
            <Container>
            <Content>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />} >
                <List>
                    <ListItem itemDivider style={{backgroundColor: 'black', opacity: 0.9}}>
                        <Text style={styles.FirstLetter}>Games List</Text>
                    </ListItem>
                    {  this.state.data_prive.map(data => ( <ListItem >
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('LeaderBoardGame', {id: data.id})} title="0">
                            <Text  style={styles.listItems}>{data.title} #{data.id}</Text>
                        </TouchableOpacity>
                    </ListItem>
                    ) ) }
                </List>
                </ScrollView>
            </Content>
        </Container>
            )
        }
    }
  render() {
    return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.HeaderGenerique}>
                <Text style={styles.logoText}>
                    <Text style={{color:'white'}}>Games - </Text>
                    <Text style={{color:'white', fontSize: 24}} onPress={() => this.onLogout()} >{this.state.user.username}</Text>                    
                </Text>
            </View>
        </TouchableWithoutFeedback>
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', borderColor:'#eae5e5', borderWidth: 1.2}}>
                <TouchableOpacity onPress={() =>  this.segmentClicked(0)} active={this.state.activeIndex == 0 } title="0">
                    <Text style={[this.state.activeIndex == 0 ? {color:'black' ,fontWeight:'bold' ,fontSize: 28} : {color:'black' ,opacity:0.5 ,fontWeight:'bold' ,fontSize:30}]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  this.segmentClicked(1)} active={this.state.activeIndex == 1 } title="1">
                    <Text style={[this.state.activeIndex == 1 ? {color:'black' ,fontWeight:'bold' ,fontSize: 28} : {color:'black' ,opacity:0.5 ,fontWeight:'bold' ,fontSize:30}]}>Private</Text>
                </TouchableOpacity>
            </View>
        </View>
        {this.renderSection()}
        <Button
                buttonStyle={styles.addcateButton}
                title="Add Game"
                onPress={() => this.props.navigation.navigate('TimePoints') }
        />
    </KeyboardAvoidingView>
    );
  }
}
  