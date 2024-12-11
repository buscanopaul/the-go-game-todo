import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  useCreateTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from '../hooks/todos';
import { useState } from 'react';
import AddTodo from '../components/AddTodo';
import EditTodo from '../components/EditTodo';
import TodoList from '../components/TodoList';
import Logout from '../components/Logout';

const HomeScreen = ({ navigation }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const { data: todos, isLoading } = useTodos();
  const deleteTodoMutation = useDeleteTodo();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

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

  const handleToggleTodo = (todo) => {
    updateTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditedTitle(todo.title);
  };

  const saveEditedTodo = () => {
    if (editingTodo && editedTitle.trim()) {
      updateTodoMutation.mutate({
        id: editingTodo.id,
        title: editedTitle.trim(),
      });
      setEditingTodo(null);
    }
  };

  const handleDeleteTodo = (item) => {
    deleteTodoMutation.mutate(item.id);
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1 px-4">
      <View className="h-40" />
      <Logout onPress={handleLogout} />
      <View className="h-10" />
      <AddTodo
        onPress={handleAddTodo}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
      />
      <TodoList
        onPress={handleDeleteTodo}
        todos={todos}
        handleToggleTodo={handleToggleTodo}
        handleEditTodo={handleEditTodo}
      />
      <EditTodo
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        onPress={saveEditedTodo}
      />
    </View>
  );
};

export default HomeScreen;
