import axios from 'axios';
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {AppContext} from '../App';

interface Props {
  route: any;
}

const HomeScreen: React.FunctionComponent<Props> = props => {
  const {username} = props.route.params;
  const {itemCount, incrementCount} = React.useContext(AppContext);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data.slice(0, 10)))
      .catch(error => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={incrementCount}>
            <Text style={styles.cardTitle}>{item.title}</Text>
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
});
