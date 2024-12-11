import { Text, Pressable } from 'react-native';

type LogoutProps = {
  onPress: () => void;
};

const Logout = ({ onPress }: LogoutProps) => {
  return (
    <Pressable
      className="p-3 bg-black rounded-full active:opacity-70"
      onPress={onPress}
    >
      <Text className="text-white">Logout</Text>
    </Pressable>
  );
};

export default Logout;
