import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-yookassa-signature');

    if (!signature) {
      console.error('Missing YooKassa signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 403 });
    }

    // Verify YooKassa webhook signature
    // Format: HTTP Body + Secret Key -> SHA-256 hash
    const secretKey = process.env.YKASSA_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const computedSignature = crypto
      .createHash('sha256')
      .update(body + secretKey)
      .digest('hex');

    if (signature.toLowerCase() !== computedSignature.toLowerCase()) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;
    const paymentObject = payload.object;


    if (event === 'payment.succeeded' && paymentObject.status === 'succeeded') {
      const userId = paymentObject.metadata?.userId;
      const credits = paymentObject.metadata?.credits;



      if (userId && credits) {
        try {
          const clerk = await clerkClient();
          const user = await clerk.users.getUser(userId);
          const currentCredits = (user.publicMetadata.credits as number) || 0;
          const newCredits = currentCredits + parseInt(credits, 10);

          await clerk.users.updateUserMetadata(userId, {
            publicMetadata: {
              credits: newCredits,
            },
          });

        } catch (error) {
          console.error('Failed to update user credits:', error);
        }
      }
    } else if (event === 'payment.canceled') {
    } else {
    }

    // Acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: 'YooKassa payment webhook',
    timestamp: new Date().toISOString()
  });
}
