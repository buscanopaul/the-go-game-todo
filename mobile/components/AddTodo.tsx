import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddTodo({ newTodoTitle, setNewTodoTitle, onPress }) {
  return (
    <View className="flex-row items-center gap-2 px-4 mb-4">
      <TextInput
        value={newTodoTitle}
        onChangeText={setNewTodoTitle}
        placeholder="Enter new todo"
        className="flex-1 p-2 border rounded"
      />
      <TouchableOpacity onPress={onPress} className="p-2 bg-blue-500 rounded">
        <Text className="text-white">Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}
