import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PaymentModal from './modal';
import type {
  AsyncpayCheckoutInterface,
  TCheckOutButtonProps,
} from '../@types';
import { heightPercentageToDP } from './responsiveness.helpers';
import numeral from 'numeral';
import { validatePayload } from './helpers/validators.helper';

const Checkout = ({
  buttonTitle,
  buttonStyle,
  buttonTextStyle,
  amount,
  currency,
  description,
  onClose,
  onSuccess,
  onError,
  ...props
}: TCheckOutButtonProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [payload, setPayload] = useState<
    AsyncpayCheckoutInterface | undefined
  >();

  const _handleCheckout = () => {
    const constructedPayload: AsyncpayCheckoutInterface = {
      amount,
      currency,
      description: description || 'Checkout async pay sdk',
      ...props,
    };
    validatePayload(constructedPayload);
    setPayload(constructedPayload);
    setModalVisible(true);
  };
  return (
    <>
      <TouchableOpacity
        style={{ ...styles.container, ...buttonStyle }}
        onPress={_handleCheckout}
        activeOpacity={0.1}
      >
        <Text
          style={{ ...styles.text, ...buttonTextStyle }}
        >{`${buttonTitle || `Pay ${currency} ${numeral(amount).format('0,000.00')}`}`}</Text>
      </TouchableOpacity>
      {payload && (
        <PaymentModal
          modalVisible={modalVisible}
          payload={payload}
          closeModal={() => setModalVisible(false)}
          onSuccess={onSuccess}
          onError={onError}
          onClose={onClose}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: heightPercentageToDP(5),
    backgroundColor: '#1059bc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
