import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const TodoList = ({ todos, handleToggleTodo, handleEditTodo, onPress }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between gap-4 p-4 border-b">
          <View className="flex-row items-center gap-2">
            <Checkbox
              value={item.completed}
              onValueChange={() => handleToggleTodo(item)}
              color={item.completed ? '#4630EB' : undefined}
            />
            <Text
              className={`${
                item.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {item.title}
            </Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleEditTodo(item)}
              className="p-2 bg-yellow-500 rounded"
            >
              <Text className="text-white">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress(item)}
              className="p-2 bg-red-500 rounded"
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListEmptyComponent={() => <Text>No Todos found</Text>}
    />
  );
};

export default TodoList;
