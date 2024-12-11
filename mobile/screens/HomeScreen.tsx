import { View, Text, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove the user token from secure storage
      await SecureStore.deleteItemAsync('userToken');

      // Navigate back to the Login screen
      // Replace is used to prevent going back to Home screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      // Optional: Show an error message to the user
      // You might want to use a toast or alert component here
    }
  };

  return (
    <View
      className="items-center justify-center flex-1"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Pressable className="active:opacity-70" onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
