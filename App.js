import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todosList, setTodosList] = useState([]);
  const [showModal, setShowModal] = useState(true);

  function addTodo() {
    if (todo.trim() === '') {
      return; // Don't add empty todos
    }
    setTodosList([...todosList, { text: todo, id: Date.now() }]); // Add a unique ID to each todo
    setTodo(''); // Clear the input field after adding a todo
  }

  function handleInput(todoText) {
    setTodo(todoText);
  }

  function deleteTodo(id) {
    const updatedTodos = todosList.filter(todoItem => todoItem.id !== id);
    setTodosList(updatedTodos);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}s
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Welcome to Todo App!</Text>
          <Button
            title="Start"
            onPress={() => {
              setShowModal(false);
            }}
          />
        </View>
      </Modal>
      <View style={styles.topHalf}>
      <Image style={styles.image} source={require('./assets/images/chika.png')}/>
        <View style={styles.todoInputContainer}>

          <Text>Todo List</Text>
          <TextInput
            style={styles.input}
            placeholder='Add todo'
            onChangeText={handleInput}
            value={todo}
          />
          <Button title='Add Todo' onPress={addTodo} />
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <ScrollView style={styles.todoListContainer}>
          {todosList.map((item) => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.todoStyle}>{item.text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 1, // Take half the available space
    width: '100%',
    justifyContent: 'center', // Center content vertically
    padding: 20,
    backgroundColor: 'lightgray',
  },
  bottomHalf: {
    flex: 1, // Take half the available space
    width: '100%',
  },
  todoInputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  todoListContainer: {
    flex: 1, // Take the full height of the bottom half
    width: '100%', // Take full width
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  todoStyle: {
    color: 'white',
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  }
});
