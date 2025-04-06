import Stripe from 'stripe';

export class CreateChargeDto {
  card: Stripe.PaymentMethodCreateParams.Card;
  amount: number;
}
