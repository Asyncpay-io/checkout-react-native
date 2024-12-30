import type { AsyncpayCheckoutInterface, Customer } from '../../@types';

export const returnValidationError = (error: string) => {
  return JSON.stringify({
    error: 'SDK_VALIDATION_ERROR',
    error_code: '00001',
    error_description: error,
  });
};
export const validateEmail = (email: string) => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    throw Error(returnValidationError('Please enter a valid customer_email'));
  }
};

export const validateUUID = (uuid: string) => {
  if (
    !String(uuid).match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    )
  ) {
    throw Error(returnValidationError('Please enter a valid customer_uuid'));
  }
};
export const validateCustomer = (customer: Customer) => {
  if (!customer || (customer && typeof customer !== 'object')) {
    throw Error(
      returnValidationError(
        'Please enter the customer information. The function requires either the `customer_email`, `customer_uuid` or a `customer` object containing all the fields of the customer. '
      )
    );
  }
  const clonedCustomer = { ...customer };
  const { email, first_name, last_name, phone_number } = clonedCustomer;
  if (!email) {
    throw Error(
      returnValidationError('email is a required field of the customer object')
    );
  }
  if (!first_name) {
    throw Error(
      returnValidationError(
        'first_name is a required field of the customer object'
      )
    );
  }
  if (!last_name) {
    throw Error(
      returnValidationError(
        'last_name is a required field of the customer object'
      )
    );
  }
  validateEmail(email);
  if (first_name.split(' ').length > 1) {
    throw Error(
      returnValidationError('The first name can only contain one word.')
    );
  }
  if (last_name.split(' ').length > 1) {
    throw Error(
      returnValidationError('The last name can only contain one word.')
    );
  }
  if (phone_number && phone_number.split(' ').length > 1) {
    throw Error(
      returnValidationError('The phone number can only contain one word.')
    );
  }
};

export const validateMetadata = (obj: { [key: string]: string }) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    throw Error(
      returnValidationError(
        'Please enter valid metadata. It must consist of an object whose the keys and values must be strings.'
      )
    );
  }

  for (const key in obj) {
    if (typeof key !== 'string' || typeof obj[key] !== 'string') {
      throw Error(
        returnValidationError(
          'Please enter valid metadata. It must consist of an object whose the keys and values must be strings.'
        )
      );
    }
  }

  return obj;
};

export const validateAmount = (amount: number | string) => {
  const pattern = /^\d+(\.\d{1,3})?$/;
  let testAmount = amount;
  if (typeof testAmount === 'number') {
    testAmount = testAmount + '';
  }

  if (!pattern.test(testAmount) && parseFloat(testAmount) >= 0) {
    throw new Error(returnValidationError('Please provide a valid amount.'));
  }
};

export const validateCurrency = (currency: string) => {
  const pattern = /^[A-Z]{3}$/;
  if (!pattern.test(currency)) {
    throw new Error(
      returnValidationError(
        'Please provide a valid currency in a valid Alphabetic ISO 4217 e.g NGN.'
      )
    );
  }
};

export const validatePayload = (payload: AsyncpayCheckoutInterface) => {
  if (!payload.publicKey) {
    throw new Error(
      returnValidationError(
        'Please provide a public key `publicKey` to the AsyncpayCheckout function.'
      )
    );
  }
  validateAmount(payload.amount);
  if (payload.customer) {
    validateCustomer(payload.customer);
  }
  if (payload.customer_email) {
    validateEmail(payload.customer_email);
    if (payload?.customer || payload?.customer_uuid) {
      throw new Error(
        returnValidationError(
          'The customer email field prohibits customer / customer uuid from being present.'
        )
      );
    }
  }
  if (payload.customer_uuid) {
    validateUUID(payload.customer_uuid);
  }
  if (payload.subscription_plan_uuid) {
    validateUUID(payload.subscription_plan_uuid);
  }
  if (
    payload.currency &&
    !payload.subscription_plan_link &&
    !payload.subscription_plan_uuid
  ) {
    validateCurrency(payload.currency);
  }

  if (!payload.customer && !payload.customer_email && !payload.customer_uuid) {
    throw new Error(
      returnValidationError(
        'Please provide one of the following, customer, customer_email or customer_uuid'
      )
    );
  }
};
