const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
  //backgroundColor: "gray"
},
logoText: {
  fontSize: 50,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 40,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 44,
  fontSize: 18,
  borderRadius: 8,
  borderWidth: 1.2,
  borderColor: 'white',
  backgroundColor: 'black',
  color: 'white',
  marginLeft: 35,
  marginRight: 35,
  marginTop: 5,
  marginBottom: 5,
  opacity:0.8,
  fontWeight: 'bold',
  textAlign: 'center',
},
loginButton: {
  borderColor: 'white',
  backgroundColor: 'black',
  borderRadius: 15,
  borderWidth: 1.2,
  height: 45,
  marginTop: 40,
  marginLeft: 110,
  marginRight: 110,
},
fbLoginButton: {
  height: 45,
  marginTop: 15,
  marginLeft: 85,
  marginRight: 85,
  borderColor: '#000000',
  backgroundColor: '#3897f1',
  borderRadius: 15,
  borderWidth: 1.2,
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
TextStyle: {
  color: 'white',
  fontSize: 18,
  textDecorationLine: 'underline'
}
};
