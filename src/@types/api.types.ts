import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AsyncpayCheckoutInterface } from '.';

export type TApiTypes = {
  initializePayment: (
    payload: Omit<AsyncpayCheckoutInterface, 'publicKey'>,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<{ data: TInitializePaymentResponse }>>;
};

type TPaymentRequest = {
  uuid: string;
  ref: string;
  checkout_url: string;
  intent: string;
  env_mode: string;
  payment_method: string;
  currency: string;
  amount: string;
  amount_to_usd: string;
  description: string;
  meta_data: any | null;
  discount: any | null;
  cancel_redirect_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  last_transaction: any | null;
  payment_channel: any | null;
  business: TBusiness;
};

type TBusiness = {
  business_id: string;
  name: string;
  env_mode: string;
  business_category: any | null;
  base_currency: string;
  logo: string;
  webhook_url: string | null;
  default_redirect_url: string | null;
  enabled_webhooks: number;
  send_subscription_mails: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  active_payment_channels: TActivePaymentChannel[];
};

type TActivePaymentChannel = {
  is_enabled: number;
  payment_channel_slug: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  webhook_url: string;
  payment_channel: TPaymentChannel;
  business: TBusiness;
};

type TPaymentChannel = {
  slug: string;
  display_name: string;
  summary: string;
  logo: string;
  logo_full: string;
  theme_color: string;
};

export type TInitializePaymentResponse = {
  payment_request: TPaymentRequest;
  should_redirect: boolean;
  action: string;
};
