const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 30,
  fontWeight: "800",
  marginTop: 30,
  marginBottom: 10,
  marginLeft: 20,
},
HeaderGenerique: {
  backgroundColor: 'black',
  opacity: 0.9,
},
body:{
  marginTop:40,
},
bodyContent: { 
  flex: 1,
  alignItems: 'center',
  padding:30,
},
sectionHeader: {
  margintop:10,
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
  fontSize: 14,
  fontWeight: 'bold',
  backgroundColor: '#eeeeee',
},
item: {
  padding: 10,
  fontSize: 18,
  height: 44,
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
mainButton: {
  marginRight: 15,
},
chrono: {
  alignItems: 'center',
},
logo: {
  color:'black',
  fontSize: 40,
  marginLeft: 165,
  marginTop: 20, 
},
NextButton: {
  marginTop: 100,
  marginLeft: 80,
  marginRight: 80,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'white',
  backgroundColor: 'black',
  borderRadius: 15,
  borderWidth: 1.2,
  },
options: {
    container: {
        marginTop: 70,
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 6,
        width: 200,
        alignItems: 'center',
      },
      text: {
        fontSize: 32,
        color: 'white',
      }
},
Name: {
  fontSize: 30,
  fontWeight: 'bold',
  color: 'black',
  marginBottom: 15,
  marginTop: 20,
  textAlign: 'center',
},
ChronoSave: {
  textAlign: 'center',
  fontSize: 32,
  color: 'black',
}
}
