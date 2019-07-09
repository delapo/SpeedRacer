const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
registerScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 50,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 40,
  textAlign: 'center',
},
registerFormView: {
  flex: 1
},
registerFormTextInput: {
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
  opacity: 0.8,
  fontWeight: 'bold',
  textAlign: 'center',
},
RegisterButton: {
    borderColor: 'white',
    backgroundColor: 'black',
    borderRadius: 15,
    borderWidth: 1.2,
    height: 45,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 100,
  },
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
TextStyle: {
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    textDecorationLine: 'underline'
},
};
