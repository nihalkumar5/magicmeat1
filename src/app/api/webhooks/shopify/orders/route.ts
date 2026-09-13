import { NextResponse } from 'next/server';

// Real-time Shopify Webhook Receiver for Orders Creation & Fulfillment
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let orderData: any = {};
    try {
      orderData = JSON.parse(rawBody);
    } catch (e) {
      console.error('Invalid Shopify Webhook JSON payload');
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Post to our local internal orders endpoint
    const internalHost = request.headers.get('host') || 'localhost:3000';
    const protocol = internalHost.includes('localhost') ? 'http' : 'https';
    
    await fetch(`${protocol}://${internalHost}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopifyOrderId: String(orderData.order_number || orderData.id),
        customerName: orderData.customer ? `${orderData.customer.first_name || ''} ${orderData.customer.last_name || ''}`.trim() : (orderData.shipping_address?.name || 'Customer'),
        customerPhone: orderData.customer?.phone || orderData.shipping_address?.phone || '+91 98765 43210',
        customerEmail: orderData.email || orderData.customer?.email || 'customer@shopify.com',
        deliveryAddress: orderData.shipping_address ? `${orderData.shipping_address.address1 || ''}, ${orderData.shipping_address.city || ''}` : 'Delivery Address',
        items: (orderData.line_items || []).map((item: any) => ({
          id: String(item.product_id || item.id),
          title: item.title || 'Meat Cut',
          quantity: item.quantity || 1,
          price: String(item.price || '0.00'),
          cutType: 'Farm Fresh Cut'
        })),
        totalAmount: parseFloat(orderData.total_price || '0'),
        deliverySlot: 'Express 45-Min'
      })
    });

    return NextResponse.json({ success: true, message: 'Shopify order live synced' }, { status: 200 });
  } catch (error: any) {
    console.error('Shopify Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
