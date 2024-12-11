import {Link, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppContext} from '../../App';

interface IProps {}

const LoginScreen: React.FunctionComponent<IProps> = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const {Authenticate, updateUser} = React.useContext(AppContext);

  const handleLogin = () => {
    if (username && password) {
      Authenticate();
      updateUser(username);
      navigation.navigate('HomeScreen', {userName: username});
    } else {
      Alert.alert('Both fields are required!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back !!!</Text>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.link}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  inputFields: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '90%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
  },
  button: {
    width: '60%',
    height: 60,
    color: 'white',
    borderRadius: 5,
  },
});
