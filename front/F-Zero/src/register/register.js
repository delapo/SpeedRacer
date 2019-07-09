import React, { Component } from "react";
import styles from "./style";
import {Keyboard, 
        Text, 
        View, 
        TextInput, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        ImageBackground,
        Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import annexe from '../../annexe'

export default class RegisterScreen extends Component {

    static navigationOptions = {
        header:null,
      };

    constructor(props){
        super(props)
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            email: ""
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
        fetch(annexe.ip+"login", login)
        .then(res => res.json())
        .then(res => {
            this._storeData(JSON.stringify(res))
            this.props.navigation.navigate('Accueil')
        }).catch((error) => console.error("Erreur Log: " ,error));
    }

    onRegister() {
        const register = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        };
        if (annexe.checkInput1(this.state) == false) {
            Alert.alert(
                'Erreur',
                'Remplir tout les champs',
            );
        }
        else {
            fetch(annexe.ip+"register", register)
            .then(res => res.json())
            .then(res => {
                if(res.message == "Email déjà prise") {
                    Alert.alert(
                        'Erreur',
                        'Email déjà utilisé!!',
                    );
                }
                if(res.message == "error, user is null, contact an administrator") {
                    Alert.alert(
                        'Erreur',
                        'Email déjà utilisé!!',
                    );
                }
                else {
                    Alert.alert(
                        'Congratulation',
                        'You create a account',
                    );
                    console.log(res)
                    this.props.navigation.navigate('Login')
                }
            }).catch((error) => console.error("Erreur Register: " ,error));
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/fond-ecran-wallpaper-image-fonds-ecran-abstrait-gris-06.jpg')} style={{width: '100%', height: '100%'}}> 
                <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.registerScreenContainer}>
                        <View style={styles.registerFormView}>
                        <Text style={styles.logoText}>
                            <Text style={{color:'white'}}>F-Zero</Text>
                        </Text>
                            <TextInput placeholder="Username" placeholderTextColor="white" style={styles.registerFormTextInput} onChange={(e) => this.setState({username: e.nativeEvent.text})} />
                            <TextInput placeholder="Firstname" placeholderTextColor="white" style={styles.registerFormTextInput} onChange={(e) => this.setState({firstname: e.nativeEvent.text})} />
                            <TextInput placeholder="Lastname" placeholderTextColor="white" style={styles.registerFormTextInput} onChange={(e) => this.setState({lastname: e.nativeEvent.text})} />
                            <TextInput placeholder="E-mail" placeholderTextColor="white" style={styles.registerFormTextInput} onChange={(e) => this.setState({email: e.nativeEvent.text})} />
                            <TextInput placeholder="Password" placeholderTextColor="white" style={styles.registerFormTextInput} secureTextEntry={true} onChange={(e) => this.setState({password: e.nativeEvent.text})} />
                            <View style={styles.MainContainer}>
                                <Text style={styles.TextStyle} onPress={ ()=> this.props.navigation.goBack() }>I have an account</Text>
                            </View>
                            <Button
                            buttonStyle={styles.RegisterButton}
                            onPress={() => this.onRegister()} title="Register"
                            />
                        </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
      }
}
