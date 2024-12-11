import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLogin, useRegister } from '../hooks/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigation.navigate('Home');
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || error.message || 'Login failed';
          Alert.alert('Oops!', errorMessage);
          setPassword('');
        },
      }
    );
  };

  const handleRegister = () => {
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigation.navigate('Home');
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Registration failed';
          Alert.alert('Oops!', errorMessage);
          setPassword('');
        },
      }
    );
  };

  return (
    <View className="justify-center flex-1 p-4">
      <Text className="mb-5 text-5xl font-bold text-center">Welcome</Text>
      <TextInput
        className="p-3 mb-4 border rounded"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        className="p-3 mb-4 border rounded"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View className="h-10" />
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded"
        onPress={handleLogin}
      >
        <Text className="text-center text-white">Login</Text>
      </TouchableOpacity>
      <View className="h-2" />
      <TouchableOpacity
        className="p-4 bg-yellow-500 rounded"
        onPress={handleRegister}
      >
        <Text className="text-center text-white">Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
