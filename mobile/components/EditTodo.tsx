import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

const EditTodo = ({
  editingTodo,
  setEditingTodo,
  editedTitle,
  setEditedTitle,
  onPress,
}) => {
  return (
    <Modal
      visible={!!editingTodo}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setEditingTodo(null)}
    >
      <View className="items-center justify-center flex-1 bg-black/50">
        <View className="w-10/12 p-4 bg-white rounded-lg">
          <Text className="mb-4 text-lg font-bold">Edit Todo</Text>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            className="p-2 mb-4 border rounded"
            autoFocus={true}
          />
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setEditingTodo(null)}
              className="p-2 bg-gray-300 rounded"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPress}
              className="p-2 bg-blue-500 rounded"
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTodo;
