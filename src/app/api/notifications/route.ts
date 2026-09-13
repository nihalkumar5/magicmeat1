import { NextResponse } from 'next/server';

interface PushNotificationPayload {
  to?: string; // Expo push token (e.g. ExponentPushToken[xxxxxx])
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: 'default' | null;
}

// In-memory log of sent notifications for the admin dashboard
let notificationLogs: Array<PushNotificationPayload & { id: string; sentAt: string }> = [
  {
    id: 'NOTIF-1',
    title: '🥩 Fresh Cut Prepared!',
    body: 'Your Chicken Curry Cut (500g) has been freshly cut, cleaned, and packed under 4°C temperature control.',
    data: { orderId: 'ORD-9842', type: 'ORDER_UPDATE' },
    sentAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: 'NOTIF-2',
    title: '🛵 Rider Out For Delivery!',
    body: 'Rider Vikram Singh is on the way with your farm-fresh meat. Arriving in ~14 minutes.',
    data: { orderId: 'ORD-9842', type: 'RIDER_ASSIGNED' },
    sentAt: new Date(Date.now() - 8 * 60 * 1000).toISOString()
  }
];

export async function GET() {
  return NextResponse.json({ notifications: notificationLogs });
}

export async function POST(request: Request) {
  try {
    const payload: PushNotificationPayload = await request.json();

    const newLog = {
      id: `NOTIF-${Date.now()}`,
      title: payload.title || 'Magic Meat Update',
      body: payload.body || '',
      data: payload.data || {},
      to: payload.to || 'ALL_ACTIVE_CUSTOMERS',
      sentAt: new Date().toISOString()
    };

    // If an Expo push token is provided, broadcast to Expo's Push Service
    if (payload.to && payload.to.startsWith('ExponentPushToken')) {
      try {
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: payload.to,
            sound: 'default',
            title: payload.title,
            body: payload.body,
            data: payload.data,
          }),
        });
      } catch (expoErr) {
        console.warn('Expo push dispatch warning:', expoErr);
      }
    }

    notificationLogs.unshift(newLog);
    return NextResponse.json({ success: true, notification: newLog });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to dispatch notification' }, { status: 500 });
  }
}
