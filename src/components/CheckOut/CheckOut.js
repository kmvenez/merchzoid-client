import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };

  render () {
    return (
      <StripeCheckout
        stripeKey="pk_test_51I0aIkLFzNZ9971gON9hdLz3VSXKsp8fz3HpWiXB3XYtS5J1DiQWxk6aJl4nmg3Oeivlf6LvDsxiw4bUGe2bgFTC0051OmWUwz"
        token={this.onToken}
        amount= {500}
        billingAddress
        description="Awesome Choice!"
        locale="auto"
        name="MERCHZOID"
        zipCode
      />
    )
  }
}
