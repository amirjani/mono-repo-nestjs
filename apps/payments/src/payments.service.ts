import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY')!,
    {
      apiVersion: '2025-03-31.basil',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCustomer(name: string, email: string) {
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    return customer;
  }

  async createCharge(createChargeDto: CreateChargeDto) {
    // Create a payment method using the token
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: createChargeDto.token,
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: createChargeDto.amount * 100,
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
      payment_method_types: ['card'],
    });

    return paymentIntent;
  }
}
