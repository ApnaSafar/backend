const stripe = require("stripe")(process.env.STRIPE_KEY);

async function createCheckoutSession({ type, amount, description, ticketID }) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: description,
            },
            unit_amount: amount*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://frontend-drab-zeta-69.vercel.app/success.html?type=${type}&session_id={CHECKOUT_SESSION_ID}&product_id=${ticketID}`,
      cancel_url: `http://localhost:3000`,
    });

    return session.id;
  } catch (error) {
    throw new Error(`Failed to create checkout session: ${error.message}`);
  }
}

module.exports = createCheckoutSession;
