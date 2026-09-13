'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: string;
  weight?: string;
  cutType?: string;
}

interface Order {
  id: string;
  shopifyOrderId?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'CONFIRMED' | 'PREPARING_CUTS' | 'COLD_PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  deliverySlot: string;
  riderName?: string;
  riderPhone?: string;
  estimatedDeliveryMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export default function LiveOrderTrackingPage() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-9842');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders && data.orders.length > 0) {
        setAllOrders(data.orders);
        const current = data.orders.find((o: Order) => o.id === selectedOrderId) || data.orders[0];
        setActiveOrder(current);
      }
    } catch (err) {
      console.error('Error loading order tracking:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Live poll every 5s
    return () => clearInterval(interval);
  }, [selectedOrderId]);

  // Stepper milestones
  const steps = [
    {
      key: 'CONFIRMED',
      title: 'Order Confirmed',
      desc: 'Sent to master butcher station',
      icon: '📝'
    },
    {
      key: 'PREPARING_CUTS',
      title: 'Fresh Cuts & Cleaning',
      desc: 'Hygiene water wash & precise cuts',
      icon: '🥩'
    },
    {
      key: 'COLD_PACKED',
      title: '4°C Cold Chain Packed',
      desc: 'Sealed with food-grade gel chillers',
      icon: '❄️'
    },
    {
      key: 'OUT_FOR_DELIVERY',
      title: 'Rider Out for Delivery',
      desc: 'On express route to your doorstep',
      icon: '🛵'
    },
    {
      key: 'DELIVERED',
      title: 'Delivered Fresh',
      desc: 'Ready for your gourmet cooking',
      icon: '🎉'
    }
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'CONFIRMED': return 0;
      case 'PREPARING_CUTS': return 1;
      case 'COLD_PACKED': return 2;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  const currentStepIndex = activeOrder ? getStepIndex(activeOrder.status) : 0;

  return (
    <div className="min-h-screen bg-[#07080B] text-gray-100 font-sans pb-28 select-none">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#0B0D14]/90 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/shop" className="p-2 -ml-2 text-gray-400 hover:text-white transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <div className="text-center">
            <h1 className="text-base font-bold text-white tracking-tight">Live Meat Tracking</h1>
            <p className="text-[11px] text-amber-400 font-medium">⚡ Farm-Fresh Temperature Controlled</p>
          </div>
          <Link href="/admin" className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white">
            Admin ↗
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-4 space-y-5">

        {/* Order Selector (if multiple orders exist) */}
        {allOrders.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {allOrders.map(ord => (
              <button
                key={ord.id}
                onClick={() => { setSelectedOrderId(ord.id); setActiveOrder(ord); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  (activeOrder?.id === ord.id)
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                    : 'bg-[#11131C] text-gray-400 border border-white/5'
                }`}
              >
                {ord.id} • ₹{ord.totalAmount}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="p-16 text-center text-gray-500 animate-pulse">Loading live tracking details...</div>
        ) : !activeOrder ? (
          <div className="p-12 text-center text-gray-400">No active delivery found.</div>
        ) : (
          <>
            {/* Live ETA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161824] via-[#10121B] to-[#0A0C13] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                    {activeOrder.status === 'DELIVERED' ? 'COMPLETED' : 'LIVE DISPATCH'}
                  </span>
                  <h2 className="text-2xl font-black text-white mt-2 font-mono">
                    {activeOrder.status === 'DELIVERED'
                      ? 'Delivered Fresh'
                      : `Arriving in ~${activeOrder.estimatedDeliveryMinutes} mins`}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Order <span className="text-amber-400 font-mono font-bold">{activeOrder.id}</span>
                  </p>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-rose-900/50 animate-bounce">
                  {steps[currentStepIndex].icon}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-6">
                <div 
                  className="bg-gradient-to-r from-rose-600 via-red-500 to-amber-400 h-full transition-all duration-700 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Rider Details Card (If out for delivery) */}
            {activeOrder.riderName && (
              <div className="p-4 rounded-2xl bg-[#0F111A] border border-purple-500/20 shadow-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl">
                    🛵
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Cold-Chain Delivery Partner</p>
                    <p className="text-sm font-bold text-white">{activeOrder.riderName}</p>
                    <p className="text-xs text-gray-400 font-mono">{activeOrder.riderPhone}</p>
                  </div>
                </div>

                {activeOrder.riderPhone && (
                  <a
                    href={`tel:${activeOrder.riderPhone}`}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 transition flex items-center space-x-1.5"
                  >
                    <span>📞 Call</span>
                  </a>
                )}
              </div>
            )}

            {/* Visual Delivery Stepper */}
            <div className="p-6 rounded-3xl bg-[#0E1017] border border-white/5 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[11px] text-gray-400">
                Freshness Journey
              </h3>

              <div className="space-y-6 relative pl-2">
                {steps.map((step, idx) => {
                  const isPast = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.key} className="flex items-start space-x-4 relative">
                      {/* Connecting Line */}
                      {idx < steps.length - 1 && (
                        <div 
                          className={`absolute left-4 top-8 bottom-[-24px] w-0.5 ${
                            idx < currentStepIndex ? 'bg-rose-600' : 'bg-white/10'
                          }`}
                        />
                      )}

                      {/* Step Circle */}
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 shrink-0 transition-all ${
                          isCurrent
                            ? 'bg-rose-600 text-white ring-4 ring-rose-600/30 scale-110 animate-pulse shadow-lg shadow-rose-900/50'
                            : isPast
                            ? 'bg-rose-600/80 text-white'
                            : 'bg-white/5 text-gray-600 border border-white/10'
                        }`}
                      >
                        {isPast ? '✓' : idx + 1}
                      </div>

                      {/* Step Label */}
                      <div className="pt-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-bold ${isPast ? 'text-white' : 'text-gray-500'}`}>
                            {step.title}
                          </p>
                          <span className="text-base">{step.icon}</span>
                        </div>
                        <p className={`text-xs mt-0.5 ${isPast ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination Address & Items */}
            <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/5 space-y-3 text-xs">
              <div className="flex items-start space-x-3 pb-3 border-b border-white/5">
                <span className="text-rose-500 text-base">📍</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Delivering To</p>
                  <p className="text-gray-200 mt-0.5 leading-relaxed">{activeOrder.deliveryAddress}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Items in Package</p>
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1 text-gray-300">
                    <span>{item.quantity}x {item.title}</span>
                    <span className="font-mono text-amber-400 font-semibold">₹{parseFloat(item.price) * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

          </>
        )}

      </main>

      {/* Floating Bottom Navigation for Mobile App */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0D14]/95 backdrop-blur-xl border-t border-white/10 py-3 px-6">
        <div className="max-w-md mx-auto flex items-center justify-around text-xs">
          <Link href="/shop" className="flex flex-col items-center text-gray-400 hover:text-white transition">
            <span className="text-lg">🥩</span>
            <span className="text-[10px] font-semibold mt-1">Shop</span>
          </Link>
          <Link href="/tracking" className="flex flex-col items-center text-rose-500 font-bold transition">
            <span className="text-lg">📍</span>
            <span className="text-[10px] mt-1">Live Track</span>
          </Link>
          <Link href="/admin" className="flex flex-col items-center text-gray-400 hover:text-white transition">
            <span className="text-lg">⚙️</span>
            <span className="text-[10px] font-semibold mt-1">Admin</span>
          </Link>
        </div>
      </nav>

    </div>
  );
}
