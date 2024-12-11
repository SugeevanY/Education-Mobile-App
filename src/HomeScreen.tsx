import axios from 'axios';
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {AppContext} from '../App';
import {useNavigation, useRoute} from '@react-navigation/native';

interface Props {
  userName: string;
}

type navParams = {
  userName: string;
};

const HomeScreen: React.FunctionComponent<Props> = () => {
  const route = useRoute();
  const {params} = route as {params: navParams};
  const {itemCount, incrementCount, Authenticate} =
    React.useContext(AppContext);
  const [data, setData] = React.useState<any[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    axios
      .get('https://dummyjson.com/c/017c-3473-450b-98f6')
      .then(response => setData(response.data.courses))
      .catch(error => console.error(error));
  }, []);

  console.log(params.userName);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginScreen');
          Authenticate();
        }}
        style={styles.logoutButton}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome, {params.userName}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.courseId.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={incrementCount}>
            <Image
              source={{
                uri: 'https://www.pexels.com/photo/close-up-photo-of-programming-of-codes-546819/',
              }}
              style={{width: 200, height: 200}}
            />
            <Text style={styles.cardTitle}>{item.courseName}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 65,
    height: 35,
    borderRadius: 20,
  },
});
