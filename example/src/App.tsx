import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckoutButton, useCheckout } from 'checkout-react-native';
import { heightPercentageToDP } from '../../src/modules/responsiveness.helpers';

export default function App() {
  const { _handleCheckout, Modal } = useCheckout({
    amount: 10000,
    currency: 'NGN',
    reference: `123q4qad-${Math.random() * 90000}`,
    customer: {
      email: 'example@mail.com',
      first_name: 'Randy',
      last_name: 'Ullah',
    },
    customer_email: 'example@mail.com',
    publicKey: '${YOUR_API_KEY}',
  });
  return (
    <View style={styles.container}>
      <CheckoutButton
        publicKey="${YOUR_API_KEY}"
        amount={10000}
        currency={'NGN'}
        reference={`123q4qad-${Math.random() * 90000}`}
        customer={{
          email: 'example@mail.com',
          first_name: 'Randy',
          last_name: 'Ullah',
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={_handleCheckout}
      >
        <Text style={styles.text}>Press me</Text>
      </TouchableOpacity>
      <Modal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  buttonContainer: {
    width: '90%',
    height: heightPercentageToDP(5),
    backgroundColor: '#1059bc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: heightPercentageToDP(5),
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
