<p align="center">    
   <img title="Asyncpay" height="50" src="https://asyncpay-imgs.s3.amazonaws.com/Asyncpayyy_Logo.png" />  
</p>

# Asyncpay Checkout SDK

This SDK allows you to seamlessly connect to multiple payment channels such as Flutterwave, Paystack and Stripe and
create a checkout experience with only one integration.

## Demo

You can see a demo of our checkout experience here: [https://asyncpay.io/demo](https://asyncpay.io/demo)

## Requirements

1. **An Asyncpay account -** Head to [Asyncpay](https://asyncpay.io) to create an account and gain access to your
   dashboard.
2. **Connect your payment Channels -** The dashboard provides you a means to connect your multiple payment channels to
   your business. Create accounts on the payment channels you wish to integrate and provide your keys on the dashboard.
3. **Integrate this SDK -** After connecting the payment channels you can initialize payments with the Asyncpay public
   key found on your dashboard.

## Steps for Integrating this SDK

1. To install this SDK, run the npm command

```
$ npm install @asyncpay/checkout-react-native
```

OR

```
$ yarn add @asyncpay/checkout-react-native
```

2. The SDK exports a Customizable button Component

```js
import { CheckoutButton } from '@asyncpay/checkout-react-native';

<CheckoutButton
  publicKey="${YOUR_ASYNC_PAY_PUBLIC_KEY}"
  amount={10000}
  currency={'NGN'}
  customer={{
    email: 'example@mail.com',
    first_name: 'John',
    last_name: 'Doe',
  }}
/>;
```

3. The SDK exports a custom hook

```js
import { useCheckout } from '@asyncpay/checkout-react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Checkout = () => {
  const { _handleCheckout, Modal } = useCheckout({
    amount: 10000,
    currency: 'NGN',
    customer: {
      email: 'example@mail.com',
    },
    publicKey: '${YOUR_ASYNC_PAY_PUBLIC_KEY}',
  });

  return (
    <>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={_handleCheckout}
      >
        <Text style={styles.text}>Press me</Text>
      </TouchableOpacity>
      <Modal />
    </>
  );
};

const styles = StyleSheet.create({
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
```

## Available Checkout Options

Listed below are the available config options for the `AsyncpayCheckout` button and hook.

`publicKey`,
`amount`,
`description`,
`customer_email`,
`customer_uuid`,
`subscription_plan_uuid`,
`customer`,
`paymentChannel`,
`onError`,
`onSuccess`,
`logo`,
`buttonStyle`,
`buttonTextStyle`,
`buttonTitle`

| Name                     | Required                                                            | Description                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicKey`              | `true`                                                              | The public key of your business gotten from the [Asyncpay](https://asyncpay.io) dashboard.                                                                                                                 |
| `amount`                 | `true` but not considered when `subscription_plan_uuid` is present  | The amount you want to charge the user.                                                                                                                                                                    |
| `currency`               | `false` but not considered when `subscription_plan_uuid` is present | The amount you want to charge the user.                                                                                                                                                                    |
| `description`            | `false` but not considered when `subscription_plan_uuid` is present | The description of the transaction.                                                                                                                                                                        |
| `customer_email`         | required if `customer_uuid` and `customer` is absent                | The email of the customer you want to charge.                                                                                                                                                              |
| `customer_uuid`          | required if `customer_email` and `customer` is absent               | The UUID of the customer you want to charge.                                                                                                                                                               |
| `subscription_plan_uuid` | `false` prohibits `amount`, `currency` and `description`            | The UUID of the subscription plan you want to subscribe your customer to.                                                                                                                                  |
| `customer`               | required if `customer_email` and `customer_uuid` is absent          | The customer object of the customer. Using this option would create a customer on the user.                                                                                                                |
| `metadata`               | `false`                                                             | An object that can be used to add metadata to the checkout. It expects an object whose keys and values are strings.                                                                                        |
| `save_payment_method`    | `false`                                                             | This flag determines whether the payment method used for this checkout should be saved on Asyncpay. Saving this method for the customer allows you to initiate a charge later on the saved payment method. |
| `reference`              | `false`                                                             | A uniquely generated reference to be tied to the payment request for your checkout session.                                                                                                                |
| `payment_channel`        | `false`                                                             | The payment channel you want to route the payment to. If you set a value here, the checkout goes staright to that payment channel without giving the user a choice.                                        |
| `buttonStyle`            | `false`                                                             | For Styling the checkout button.                                                                                                                                                                           |
| `buttonTextStyle`        | `false`                                                             | For styling the checkout text .                                                                                                                                                                            |
| `onCancel`               | `false`                                                             | A javascript function to call after the user cancels the checkout page.                                                                                                                                    |
| `buttonTitle`            | `false`                                                             | Set The a custom title for the checkout button.                                                                                                                                                            |
| `onError`                | `false`                                                             | A javascript function to call whenever there is an error during the checkout process. An argument with a type of `Error` would be supplied to describe the error.                                          |
| `onSuccess`              | `false`                                                             | A javascript function to call after the user has successfully completed checkout.                                                                                                                          |
| `logo`                   | `false`                                                             | The logo to show up on the payment page if you want to override the logo set on the dashboard.                                                                                                             |

## Available Customer Object Options

The table below shows the properties that can be attached to a `customer` object if you choose to use that to initialize a payment request with the SDK.

| Name             | Required                    |
| ---------------- | --------------------------- |
| `first_name`     | `true`                      |
| `last_name`      | `true`                      |
| `email`          | `true`                      |
| `phone_code`     | Required if email is absent |
| `phone_number`   | Required if email is absent |
| `address_line_1` | `false`                     |
| `address_line_2` | `false`                     |
| `city`           | `false`                     |
| `state`          | `false`                     |
| `country`        | `false`                     |
| `zip`            | `false`                     |

## Support

Feel free to send a message to `info@asyncpay.io` for any support regarding using this SDK or create an issue
on [Github](https://github.com/Asyncpay-io/checkout-js/issues)
