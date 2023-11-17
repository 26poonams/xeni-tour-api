const stripeKey = require('./config/stripekey')
const stripe = require('stripe')(stripeKey.secretKey);


const func = async () => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2034,
      cvc: '314',
    },
  });
  console.log(paymentMethod);
};

func();