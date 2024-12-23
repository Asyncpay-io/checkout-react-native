import {
  View,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
} from 'react-native';

const Loader = ({ color, style }: { color?: string; style?: ViewStyle }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <ActivityIndicator size="large" color={color || '#1059bc'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
