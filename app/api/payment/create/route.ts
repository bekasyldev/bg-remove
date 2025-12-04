import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server'; 
import { YooCheckout } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({
  shopId: process.env.YKASSA_SHOP_ID!,
  secretKey: process.env.YKASSA_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser(); 
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;

    if (!userEmail) {
       return NextResponse.json({ error: 'User email is required for receipt' }, { status: 400 });
    }

    const { amount, credits } = await request.json();

    if (!amount || !credits) {
      return NextResponse.json({ error: 'Amount and credits are required' }, { status: 400 });
    }

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://grayai.ru' 
      : 'http://localhost:3000';

    const payment = await checkout.createPayment({
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${baseUrl}/payment/success`,
      },
      capture: true,
      description: `Пополнение на ${credits} кредитов`,
      metadata: {
        userId,
        credits: credits.toString(),
      },
      receipt: {
        customer: {
          email: userEmail, 
        },
        // ------------------------
        items: [
          {
            description: `Пополнение баланса на ${credits} кредитов`,
            quantity: '1',
            amount: {
              value: amount.toFixed(2),
              currency: 'RUB',
            },
            vat_code: 1, 
            payment_mode: 'full_payment',
            payment_subject: 'service',
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      paymentUrl: payment.confirmation.confirmation_url,
      paymentId: payment.id,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment' },
      { status: 500 }
    );
  }
}