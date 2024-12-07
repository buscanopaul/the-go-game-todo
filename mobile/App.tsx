import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { apiClient } from './api/client';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
