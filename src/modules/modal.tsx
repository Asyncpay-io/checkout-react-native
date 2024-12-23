import { Modal, View, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  RFPercentage,
} from './responsiveness.helpers';
import type { TPaymentModalProps } from '../@types';
import Loader from './loader';
import { WebView } from 'react-native-webview';
import { useEffect, useState } from 'react';
import requests from './apiHelper';
import { resolveError } from './helpers/error.helper';
import type { AxiosError } from 'axios';

const PaymentModal = ({
  modalVisible,
  payload,
  closeModal,
  onClose,
  onSuccess,
  onError,
}: TPaymentModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>();

  const _init = async () => {
    if (!modalVisible) return;
    setIsLoading(true);
    try {
      const { publicKey, ...body } = payload;
      const {
        data: { data },
      } = await requests.initializePayment(body, {
        headers: {
          Authentication: `Bearer ${publicKey}`,
        },
      });
      setCheckoutUrl(`${data.action}?publickey=${publicKey}`);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const error = resolveError((e as AxiosError).response?.data);
      onError && onError(error);
      closeModal();
      throw new Error(JSON.stringify(error));
    }
  };

  const _handleNavigationStateChange = (url: string) => {
    if (url.toLowerCase().includes('/success')) {
      onSuccess && onSuccess();
      return closeModal();
    }

    if (url.toLowerCase().includes('#close')) {
      onClose && onClose();
      return closeModal();
    }
  };

  useEffect(() => {
    _init();
    //eslint-disable-next-line
  }, [payload, modalVisible]);

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {isLoading && !checkoutUrl && (
            <Loader color="#fff" style={styles.tempLoader} />
          )}
          {checkoutUrl && (
            <WebView
              originWhitelist={['*']}
              style={styles.webViewContainer}
              source={{
                uri: checkoutUrl,
              }}
              bounces={false}
              overScrollMode="never"
              startInLoadingState
              renderLoading={() => <Loader color="#fff" />}
              onNavigationStateChange={({ url }) =>
                _handleNavigationStateChange(url)
              }
              androidLayerType="software"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: widthPercentageToDP(90),
    borderRadius: 10,
    alignItems: 'center',
    height: heightPercentageToDP(90),
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP(2),
  },
  content: {
    marginBottom: heightPercentageToDP(3),
  },
  closeButton: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: heightPercentageToDP(1),
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  webViewContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    flex: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  tempLoader: {
    zIndex: 1000,
    position: 'absolute',
    marginTop: heightPercentageToDP(30),
  },
});

export default PaymentModal;
