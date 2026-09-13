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
  customerEmail: string;
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

interface NotificationLog {
  id: string;
  title: string;
  body: string;
  sentAt: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  
  // Quick Broadcast Form state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Active Rider Assignment Modal
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);
  const [riderNameInput, setRiderNameInput] = useState('Vikram Singh (Express #12)');
  const [riderPhoneInput, setRiderPhoneInput] = useState('+91 99887 76655');

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchNotifications();
    const interval = setInterval(() => {
      fetchOrders();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Update order status and trigger automated notification
  const handleUpdateStatus = async (orderId: string, newStatus: Order['status'], riderInfo?: { name: string; phone: string }) => {
    try {
      const updatePayload: any = { orderId, status: newStatus };
      if (riderInfo) {
        updatePayload.riderName = riderInfo.name;
        updatePayload.riderPhone = riderInfo.phone;
        updatePayload.estimatedDeliveryMinutes = 15;
      }
      if (newStatus === 'DELIVERED') {
        updatePayload.estimatedDeliveryMinutes = 0;
      }

      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });

      if (res.ok) {
        // Send automatic push notification to customer
        let notifTitle = '';
        let notifBody = '';

        if (newStatus === 'PREPARING_CUTS') {
          notifTitle = '🥩 Master Butcher at Work!';
          notifBody = `Order ${orderId}: Your fresh meat is now being custom cut & cleaned under strict hygiene standards.`;
        } else if (newStatus === 'COLD_PACKED') {
          notifTitle = '❄️ 4°C Cold-Chain Packed!';
          notifBody = `Order ${orderId}: Packed in temperature-sealed insulated packs with gel pads for peak freshness.`;
        } else if (newStatus === 'OUT_FOR_DELIVERY') {
          notifTitle = '🛵 Rider Dispatched!';
          notifBody = `Order ${orderId}: Delivery executive ${riderInfo?.name || 'Rider'} is rushing to your location. ETA ~15 mins.`;
        } else if (newStatus === 'DELIVERED') {
          notifTitle = '🎉 Order Delivered!';
          notifBody = `Order ${orderId}: Your farm-fresh meat has arrived. Enjoy your meal!`;
        }

        if (notifTitle) {
          await fetch('/api/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: notifTitle,
              body: notifBody,
              data: { orderId, status: newStatus }
            })
          });
          fetchNotifications();
        }

        fetchOrders();
        setAssigningOrderId(null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Broadcast push to all active app customers
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    setIsSendingBroadcast(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: broadcastTitle,
          body: broadcastMessage,
          data: { type: 'BROADCAST_OFFER' }
        })
      });

      if (res.ok) {
        setBroadcastSuccess(true);
        setBroadcastTitle('');
        setBroadcastMessage('');
        fetchNotifications();
        setTimeout(() => setBroadcastSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Broadcast failed:', err);
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedStatusFilter === 'ALL') return true;
    return order.status === selectedStatusFilter;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Order Confirmed</span>;
      case 'PREPARING_CUTS':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">Fresh Cutting & Cleaning</span>;
      case 'COLD_PACKED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">4°C Cold Sealed</span>;
      case 'OUT_FOR_DELIVERY':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 animate-pulse">Rider En Route</span>;
      case 'DELIVERED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Delivered</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-700 text-gray-300">{status}</span>;
    }
  };

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;

  const handleClearOrders = async () => {
    if (confirm('Kya aap saare demo orders clear karna chahte hain?')) {
      try {
        await fetch('/api/orders', { method: 'DELETE' });
        fetchOrders();
      } catch (err) {
        console.error('Failed to clear orders:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-gray-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
      
      {/* Top Luxury Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0B0D13]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/40">
              <span className="text-xl">🥩</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">MAGIC MEAT</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/30 text-rose-300 border border-rose-500/40">
                  DISPATCH HUB
                </span>
              </div>
              <p className="text-xs text-gray-400">Shopify Store: <span className="text-amber-400 font-mono">e8uwib-18.myshopify.com</span></p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {orders.length > 0 && (
              <button
                onClick={handleClearOrders}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-rose-400 bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 transition cursor-pointer"
                title="Clear demo orders from screen"
              >
                🗑️ Clear Demo
              </button>
            )}
            <button
              onClick={() => { fetchOrders(); }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition cursor-pointer"
              title="Click to manually refresh live Shopify orders"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>🔄 Live Sync Active</span>
            </button>
            <Link
              href="/"
              className="text-xs text-gray-300 hover:text-white px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              View Storefront ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 📊 KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#12141D] to-[#0D0E15] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition"></div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Live Orders</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 font-mono">{activeOrdersCount}</h3>
            <p className="text-xs text-rose-400 mt-2 flex items-center space-x-1">
              <span>●</span> <span>In preparation / delivery</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#12141D] to-[#0D0E15] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition"></div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Orders Value</p>
            <h3 className="text-3xl font-extrabold text-amber-400 mt-2 font-mono">₹{totalRevenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-400 mt-2">Combined orders value</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#12141D] to-[#0D0E15] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition"></div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Delivery Time</p>
            <h3 className="text-3xl font-extrabold text-blue-400 mt-2 font-mono">28 Mins</h3>
            <p className="text-xs text-emerald-400 mt-2">⚡ 100% On-Time Express Delivery</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#12141D] to-[#0D0E15] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition"></div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Push Delivery Alerts</p>
            <h3 className="text-3xl font-extrabold text-purple-400 mt-2 font-mono">{notifications.length}</h3>
            <p className="text-xs text-purple-300 mt-2">Instant app notification dispatch</p>
          </div>
        </section>

        {/* 🛵 Orders Management Grid & Status Dispatch */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Live Order Stream */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0E1017] border border-white/5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>⚡ Real-Time Order Stream</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                </h2>
                <p className="text-xs text-gray-400">Manage cuts, cold packaging, and rider dispatch</p>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'CONFIRMED', 'PREPARING_CUTS', 'OUT_FOR_DELIVERY', 'DELIVERED'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedStatusFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedStatusFilter === tab
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab === 'ALL' ? 'All' : tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 animate-pulse">Loading live orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0E1017] border border-white/5 text-gray-500">
                No orders found under selected filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#11131C] to-[#0A0C12] border border-white/10 shadow-2xl transition hover:border-white/20 relative"
                  >
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-black text-rose-500 font-mono">{order.id}</span>
                        <span className="text-xs text-gray-400 font-mono">Shopify #{order.shopifyOrderId}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {order.deliverySlot}
                      </div>
                    </div>

                    {/* Customer & Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 py-2 text-xs">
                      <div className="space-y-1">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Customer Details</p>
                        <p className="text-white font-bold text-sm">{order.customerName}</p>
                        <p className="text-amber-400 font-mono">{order.customerPhone}</p>
                        <p className="text-gray-400">{order.customerEmail}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Delivery Destination</p>
                        <p className="text-gray-300 leading-relaxed">{order.deliveryAddress}</p>
                        {order.riderName && (
                          <p className="text-purple-400 font-medium pt-1">
                            🛵 Rider: {order.riderName} ({order.riderPhone})
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-[10px]">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-200 font-medium">{item.title}</span>
                            {item.cutType && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10">
                                {item.cutType}
                              </span>
                            )}
                          </div>
                          <span className="text-gray-300 font-mono">₹{parseFloat(item.price) * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-white/10 pt-2 mt-2 flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-400">Total Order Amount</span>
                        <span className="text-amber-400 text-sm font-mono">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Action Buttons to Update Status & Dispatch Push */}
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-white/5">
                      {order.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'PREPARING_CUTS')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30 transition flex items-center space-x-1.5"
                        >
                          <span>🥩 Start Fresh Cutting</span>
                        </button>
                      )}

                      {order.status === 'PREPARING_CUTS' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'COLD_PACKED')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition flex items-center space-x-1.5"
                        >
                          <span>❄️ Seal in 4°C Cold Pack</span>
                        </button>
                      )}

                      {order.status === 'COLD_PACKED' && (
                        <button
                          onClick={() => setAssigningOrderId(order.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 transition flex items-center space-x-1.5"
                        >
                          <span>🛵 Assign Express Rider</span>
                        </button>
                      )}

                      {order.status === 'OUT_FOR_DELIVERY' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition flex items-center space-x-1.5"
                        >
                          <span>✓ Mark Order Delivered</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Col: Push Notifications Center & Broadcast */}
          <div className="space-y-6">
            
            {/* Broadcast Push Composer */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/5 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔔</span>
                <h3 className="text-base font-bold text-white">App Push Broadcast</h3>
              </div>
              <p className="text-xs text-gray-400">Send flash meat alerts & notifications directly to all mobile app users.</p>

              <form onSubmit={handleSendBroadcast} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ⚡ Fresh Catch Alert: Bengal Rohu In Stock!"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Notification Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Freshly caught and cleaned river fish arrived this morning. Order now for 45-min delivery!"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                {broadcastSuccess && (
                  <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                    ✓ Notification dispatched successfully!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSendingBroadcast}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-lg shadow-rose-900/30 transition disabled:opacity-50"
                >
                  {isSendingBroadcast ? 'Sending...' : 'Broadcast to App Users 🚀'}
                </button>
              </form>
            </div>

            {/* Notification History Log */}
            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Recent Push History</span>
                <span className="text-[10px] text-gray-400 font-mono">{notifications.length} Sent</span>
              </h3>
              
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-rose-400">{notif.title}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{notif.body}</p>
                    <p className="text-[10px] text-gray-500 pt-1 font-mono">
                      {new Date(notif.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Rider Assignment Modal */}
      {assigningOrderId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#11131C] border border-white/10 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>🛵 Dispatch Rider for {assigningOrderId}</span>
            </h3>
            <p className="text-xs text-gray-400">
              Assign a dedicated cold-chain delivery rider and trigger live GPS tracking for the customer.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Rider Name & Vehicle #</label>
                <input
                  type="text"
                  value={riderNameInput}
                  onChange={(e) => setRiderNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Rider Contact Number</label>
                <input
                  type="text"
                  value={riderPhoneInput}
                  onChange={(e) => setRiderPhoneInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3">
              <button
                onClick={() => setAssigningOrderId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(assigningOrderId, 'OUT_FOR_DELIVERY', { name: riderNameInput, phone: riderPhoneInput })}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 transition"
              >
                Confirm Dispatch & Notify 🚀
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
