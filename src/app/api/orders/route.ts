import { NextResponse } from 'next/server';

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: string;
  image?: string;
  weight?: string;
  cutType?: string;
}

export interface Order {
  id: string;
  shopifyOrderId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'CONFIRMED' | 'PREPARING_CUTS' | 'COLD_PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  deliverySlot: string;
  riderName?: string;
  riderPhone?: string;
  riderLocation?: { lat: number; lng: number };
  estimatedDeliveryMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// In-memory store for orders (with pre-populated initial live orders)
let ordersStore: Order[] = [
  {
    id: 'ORD-9842',
    shopifyOrderId: '1048',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'aarav.sharma@example.com',
    deliveryAddress: 'Flat 402, Royal Palms, Sector 54, Gurugram, 122002',
    items: [
      {
        id: 'gid://shopify/Product/7972465606733',
        title: 'Chicken curry Cut (500g)',
        quantity: 2,
        price: '249.00',
        weight: '500g',
        cutType: 'Curry Cut with Bone'
      },
      {
        id: 'gid://shopify/Product/7972465442893',
        title: 'White Eggs Tray (30 Pcs)',
        quantity: 1,
        price: '210.00',
        weight: '30 Eggs',
        cutType: 'Farm Fresh Pack'
      }
    ],
    totalAmount: 708.00,
    status: 'OUT_FOR_DELIVERY',
    deliverySlot: 'Express 45-Min (11:00 AM - 11:45 AM)',
    riderName: 'Vikram Singh (Express Rider #12)',
    riderPhone: '+91 99887 76655',
    riderLocation: { lat: 28.4595, lng: 77.0266 },
    estimatedDeliveryMinutes: 14,
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-9843',
    shopifyOrderId: '1049',
    customerName: 'Priya Mehra',
    customerPhone: '+91 98112 34567',
    customerEmail: 'priya.m@example.com',
    deliveryAddress: 'Villa 18, Palm Meadows, Whitefield, Bengaluru, 560066',
    items: [
      {
        id: 'gid://shopify/Product/7972465541197',
        title: 'Rohu Fish Cleaned (1kg)',
        quantity: 1,
        price: '380.00',
        weight: '1kg',
        cutType: 'Steak Cut / Bengali Cut'
      },
      {
        id: 'gid://shopify/Product/7972465639501',
        title: 'Chicken Breast (500g)',
        quantity: 2,
        price: '280.00',
        weight: '500g',
        cutType: 'Boneless Fillet'
      }
    ],
    totalAmount: 940.00,
    status: 'PREPARING_CUTS',
    deliverySlot: 'Morning Slot (11:30 AM - 12:30 PM)',
    estimatedDeliveryMinutes: 38,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  }
];

// GET: List all orders or filter by phone/id
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const phone = searchParams.get('phone');

  if (orderId) {
    const order = ordersStore.find(o => o.id === orderId || o.shopifyOrderId === orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ order });
  }

  if (phone) {
    const userOrders = ordersStore.filter(o => o.customerPhone.includes(phone.replace(/\D/g, '')));
    return NextResponse.json({ orders: userOrders });
  }

  return NextResponse.json({ orders: ordersStore });
}

// POST: Create new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      shopifyOrderId: body.shopifyOrderId || String(Math.floor(1000 + Math.random() * 9000)),
      customerName: body.customerName || 'Customer',
      customerPhone: body.customerPhone || '',
      customerEmail: body.customerEmail || '',
      deliveryAddress: body.deliveryAddress || 'Standard Delivery Address',
      items: body.items || [],
      totalAmount: body.totalAmount || 0,
      status: 'CONFIRMED',
      deliverySlot: body.deliverySlot || 'Express 45-Min',
      estimatedDeliveryMinutes: 45,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    ordersStore.unshift(newOrder);
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}

// PATCH: Update order status / rider
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, riderName, riderPhone, estimatedDeliveryMinutes } = body;

    const orderIndex = ordersStore.findIndex(o => o.id === orderId || o.shopifyOrderId === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (status) ordersStore[orderIndex].status = status;
    if (riderName) ordersStore[orderIndex].riderName = riderName;
    if (riderPhone) ordersStore[orderIndex].riderPhone = riderPhone;
    if (typeof estimatedDeliveryMinutes === 'number') {
      ordersStore[orderIndex].estimatedDeliveryMinutes = estimatedDeliveryMinutes;
    }
    ordersStore[orderIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({ success: true, order: ordersStore[orderIndex] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 });
  }
}
