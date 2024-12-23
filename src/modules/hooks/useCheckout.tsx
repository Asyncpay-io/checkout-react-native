import { useState } from 'react';
import type { AsyncpayCheckoutInterface, TUseCheckout } from '../../@types';
import PaymentModal from '../modal';
import { validatePayload } from '../helpers/validators.helper';

const useCheckout = ({
  amount,
  currency,
  description,
  onClose,
  onSuccess,
  onError,
  ...props
}: TUseCheckout) => {
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
  const Modal = () =>
    payload && (
      <PaymentModal
        modalVisible={modalVisible}
        payload={payload}
        closeModal={() => setModalVisible(false)}
        onClose={onClose}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  return {
    _handleCheckout,
    Modal,
  };
};

export default useCheckout;
