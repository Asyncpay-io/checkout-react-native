import type { ViewStyle } from 'react-native';
import type { TextProps } from 'react-native-svg';

export type Customer = {
  email: string;
  first_name: string;
  last_name: string;
  name?: string;
  phone_number?: string;
  phone_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

export type AsyncpayCheckoutInterface = {
  publicKey: string;
  reference?: string;
  subscription_plan_uuid?: string;
  subscription_plan_link?: string;
  currency?: string;
  amount: number | string;
  description?: string;
  customer_email?: string;
  customer_uuid?: string;
  customer?: Customer;
  payment_channel?: string;
  logo?: string;
  save_payment_method?: boolean;
  metadata?: { [key: string]: string };
  environment?: 'dev' | 'local' | 'prod';
};

export type Error = {
  error: string;
  error_code: string;
  error_description: string;
};

export type TPaymentModalProps = {
  modalVisible: boolean;
  loading?: boolean;
  payload: AsyncpayCheckoutInterface;
  closeModal: () => void;
  onSuccess?: () => void;
  onError?: (e: Error) => void;
  onClose?: () => void;
};

export type TCheckOutButtonProps = AsyncpayCheckoutInterface & {
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextProps['style'];
  buttonTitle?: string;
  onSuccess?: () => void;
  onError?: (e: Error) => void;
  onClose?: () => void;
};

export type TUseCheckout = AsyncpayCheckoutInterface & {
  onSuccess?: () => void;
  onError?: (e: Error) => void;
  onClose?: () => void;
};
