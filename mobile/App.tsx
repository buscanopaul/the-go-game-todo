import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { apiClient } from './api/client';
import './global.css';
import { fetchTodos } from './hooks/fetchTodos';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await apiClient.post('/todos', {
      title: newTodo,
    });
    setNewTodo('');
    fetchTodos(setTodos);
  };

  console.log(todos);

  return (
    <AuthProvider>
      <View className="flex-1 p-4">
        <StatusBar style="auto" />
        <Text>Open up App.tsx to start working on your app!</Text>
        <TextInput
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
          onSubmitEditing={addTodo}
        />
        <Pressable onPress={addTodo} className="active:opacity-70">
          <Text>Add</Text>
        </Pressable>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>s</Text>
            </View>
          )}
        />
      </View>
    </AuthProvider>
  );
}
