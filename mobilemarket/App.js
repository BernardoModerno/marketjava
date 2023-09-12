import { StyleSheet } from 'react-native';

import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <>
      <StackNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
