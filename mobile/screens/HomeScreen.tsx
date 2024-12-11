import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDeleteTodo, useTodos } from '../hooks/todos';

const HomeScreen = ({ navigation }) => {
  const { data: todos, isLoading } = useTodos();
  const deleteTodoMutation = useDeleteTodo();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
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
      <Pressable className="active:opacity-70" onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      <View className="h-10" />
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
        ListEmptyComponent={() => <Text>No Todos found</Text>}
      />
    </View>
  );
};

export default HomeScreen;
