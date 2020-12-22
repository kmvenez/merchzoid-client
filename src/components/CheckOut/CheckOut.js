import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
  };

  // This was implemented from a pre-existing code snippet on Stripe's website.  It works ok, but I'm currently troubleshooting how to alter the amount to reflect merch.price rather than a set 5 dollars.
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
