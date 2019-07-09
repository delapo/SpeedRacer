import React, { Component } from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import styles from "./style";

import {Keyboard, 
        Text, 
        View, 
        TextInput, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        AsyncStorage,
        Alert,
        ImageBackground,
        ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import annexe from '../../annexe'

export default class LoginScreen extends Component {

    static navigationOptions = {
        header:null,
    };

    constructor(props){
        super(props)
        this.state = {
            load: false,
            password: "",
            email: ""
        }
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('user', data);
        } catch (error) {
            console.log("Erreur Store : ",error)
        }
    };

    _recupUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({user: JSON.parse(value)})
            }
        } catch (error) {
            console.error("Erreur User: ",error)
        }
    };

    checkToken = async () => {
        await this._recupUser()
        if(this.state.user == undefined ) {
            this.setState({load: false})
        }
        else {
            fetch(annexe.ip+"verifyUser", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ this.state.user.token
                },
                    body: JSON.stringify({
                    id: this.state.user.user_id,
                })
                })
            .then(res => res.json())
            .then(res => {
                if(res.error == false) {
                    this.setState({load: false})
                    this.props.navigation.navigate('Accueil')
                }
                else {
                    this.setState({load: false})
                }
            }).catch((error) => console.error("Erreur Check: " ,error));
        }
    }

    onLogin() {
        const login = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        };
        if (annexe.checkInput(this.state) == false) {
            Alert.alert(
                'Erreur',
                'Remplir tout les champs',
            );
        }
        else {
            fetch(annexe.ip+"login", login)
            .then(res => res.json())
            .then(res => {
                if(res.message == "Email inexistante") {
                    Alert.alert(
                        'Erreur',
                        'Email inexistant!',
                    );
                }
                else {
                    this._storeData(JSON.stringify(res))
                    this.props.navigation.navigate('Accueil')
                }
            }).catch((error) => console.error("Erreur Log: " ,error));
        }
    }

    componentDidMount = async () => {
        console.log("COUCOU ")
        this.setState({load: true})
        this.checkToken()
    };
    render() {
        if(this.state.load == true) {
            return(
                <ImageBackground source={require('../../assets/fond-ecran-wallpaper-image-fonds-ecran-abstrait-gris-06.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </ImageBackground>
            )
        }
        else {
            return (
                <ImageBackground source={require('../../assets/fond-ecran-wallpaper-image-fonds-ecran-abstrait-gris-06.jpg')} style={{width: '100%', height: '100%'}}>
                        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={styles.loginScreenContainer}>
                                <View style={styles.loginFormView}>
                                    <Text style={styles.logoText}>
                                        <Text style={{color:'white'}}>F-Zero</Text>
                                    </Text>
                                    <TextInput placeholder="Email" placeholderTextColor="white" style={styles.loginFormTextInput} onChange={(e) => this.setState({email: e.nativeEvent.text})} />
                                    <TextInput placeholder="Password" placeholderTextColor="white" style={styles.loginFormTextInput} secureTextEntry={true} onChange={(e) => this.setState({password: e.nativeEvent.text})} />
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        onPress={() => this.onLogin() }
                                        title="Login"
                                    />
                                    <View style={styles.MainContainer}>
                                        <Text style={styles.TextStyle} onPress={ ()=> this.props.navigation.navigate('Register') }>Create an account</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </ImageBackground>

            );
        }
    }
}