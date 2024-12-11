import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface IProps {}

const RegisterScreen: React.FunctionComponent<IProps> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigation = useNavigation();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert('Both fields are required!');
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one special character.',
      );
      return;
    }
    setError('');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.button}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View style={styles.link}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
  },
  errorText: {
    width: '80%',
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '60%',
    height: 60,
    color: 'white',
    borderRadius: 5,
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
});
