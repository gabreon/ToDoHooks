import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ToDoList from './ToDoList';

const App = () => {
  const [value, setValue] = useState('');
  const [toDos, setToDos] = useState([]);

  addToDo = () => {
    if (value.length > 0) {
      setToDos([...toDos, { text: value, key: Date.now(), checked: false }]);
      setValue('');
    }
  };

  checkToDo = id => {
    setToDos(
      toDos.map(toDo => {
        if (toDo.key === id) toDo.checked = !toDo.checked;
        return toDo;
      }),
    );
  };

  deleteToDo = id => {
    setToDos(
      toDos.filter(toDo => {
        if (toDo.key !== id) return true;
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de tarefas</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="O que você quer fazer hoje?"
          placeholderTextColor="#ABBABB"
          value={value}
          onChangeText={value => setValue(value)}
        />
        <TouchableOpacity onPress={() => addToDo()}>
          <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: '100%' }}>
        {toDos.map(item => (
          <ToDoList
            text={item.text}
            key={item.key}
            checked={item.checked}
            setChecked={() => checkToDo(item.key)}
            deleteToDo={() => deleteToDo(item.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: '15%',
    fontSize: 24,
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'black',
    borderBottomWidth: 0.6,
    paddingRight: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%',
  },
});

export default App;
