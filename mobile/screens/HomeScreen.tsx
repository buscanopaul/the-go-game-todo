import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useCreateTodo, useDeleteTodo, useTodos } from '../hooks/todos';
import { useState } from 'react';
import AddTodo from '../components/AddTodo';

const HomeScreen = ({ navigation }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { data: todos, isLoading } = useTodos();
  const deleteTodoMutation = useDeleteTodo();
  const createTodoMutation = useCreateTodo();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      createTodoMutation.mutate(
        { title: newTodoTitle.trim() },
        {
          onSuccess: () => {
            setNewTodoTitle('');
          },
          onError: (error) => {
            console.error('Failed to create todo:', error);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1">
      <View className="h-40" />
      <Pressable
        className="p-3 bg-black rounded-full active:opacity-70"
        onPress={handleLogout}
      >
        <Text className="text-white">Logout</Text>
      </Pressable>
      <View className="h-10" />
      <AddTodo
        onPress={handleAddTodo}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between gap-4 p-4 border-b">
            <Text>{item.title}</Text>
            <TouchableOpacity
              onPress={() => deleteTodoMutation.mutate(item.id)}
              className="p-2 bg-red-500 rounded"
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-gray-400">No Todos found</Text>
        )}
      />
    </View>
  );
};

export default HomeScreen;
