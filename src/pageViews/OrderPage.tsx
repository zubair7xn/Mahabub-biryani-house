'use client';

import { useState } from 'react';
import { menuItems } from '../data/menu';
import { restaurantInfo } from '../data/restaurant';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Phone, MessageCircle } from 'lucide-react';
import { formatPrice, generateOrderId, calculateEstimatedDeliveryTime } from '../utils/helpers';
import { ScrollReveal } from '../components/AnimationWrappers';

interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  specialNotes: string;
}

interface OrderPageProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function OrderPage({ isDark = false, language = 'en' }: OrderPageProps) {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    specialNotes: '',
  });

  const addToOrder = (item: typeof menuItems[0]) => {
    const existingItem = selectedItems.find((i) => i.itemId === item.id);

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(itemId);
    } else {
      setSelectedItems(
        selectedItems.map((i) =>
          i.itemId === itemId ? { ...i, quantity } : i
        )
      );
    }
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((i) => i.itemId !== itemId));
  };

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = (method: 'call' | 'whatsapp' | 'foodpanda') => {
    if (!formData.name || !formData.phone || !formData.address || selectedItems.length === 0) {
      alert(
        language === 'en'
          ? 'Please fill all fields and select items'
          : 'সব ফিল্ড পূরণ করুন এবং আইটেম নির্বাচন করুন'
      );
      return;
    }

    const orderId = generateOrderId();
    const orderSummary = selectedItems
      .map((item) => `${item.quantity}x ${item.name} (${formatPrice(item.price)})`)
      .join('\n');

    const message = `Order ID: ${orderId}\n\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nItems:\n${orderSummary}\n\nTotal: ${formatPrice(totalPrice)}\n\nSpecial Notes: ${formData.specialNotes || 'None'}`;

    if (method === 'call') {
      window.location.href = `tel:${restaurantInfo.phone}`;
    } else if (method === 'whatsapp') {
      window.open(
        `https://wa.me/${restaurantInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    } else if (method === 'foodpanda') {
      window.open('https://www.foodpanda.com.bd', '_blank');
    }
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Place Your Order' : 'আপনার অর্ডার করুন'}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? 'Fresh food delivered to your doorstep'
              : 'তাজা খাবার আপনার দরজায় পৌঁছে যায়'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Selection */}
          <div className="lg:col-span-2">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Select Items' : 'আইটেম নির্বাচন করুন'}
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4 }}
                  className={`p-4 rounded-lg flex justify-between items-center ${
                    isDark ? 'bg-gray-800' : 'bg-gray-50'
                  } hover:shadow-lg transition-all`}
                >
                  <div className="flex-1">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                  >
                    {language === 'en' ? 'Add' : 'যোগ করুন'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary & Form */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            <ScrollReveal
              className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 mb-6 shadow-lg`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Order Summary' : 'অর্ডার সারসংক্ষেপ'}
              </h3>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {selectedItems.length === 0 ? (
                  <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'en'
                      ? 'No items selected'
                      : 'কোনো আইটেম নির্বাচিত নয়'}
                  </p>
                ) : (
                  selectedItems.map((item) => (
                    <motion.div
                      key={item.itemId}
                      layout
                      className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} flex justify-between items-center`}
                    >
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.quantity}x {formatPrice(item.price)} = {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                          className={`p-1 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
                        >
                          <Minus size={14} />
                        </button>
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                          className={`p-1 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.itemId)}
                          className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {selectedItems.length > 0 && (
                <>
                  <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-3`}>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span className="font-bold">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Delivery:</span>
                      <span className="font-bold text-green-500">
                        {language === 'en' ? 'Free' : 'বিনামূল্যে'}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-amber-500">
                      <span>{language === 'en' ? 'Total:' : 'মোট:'}</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className={`mt-3 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-amber-50'} text-sm`}>
                    <p className="font-bold mb-1">
                      {language === 'en'
                        ? 'Estimated Delivery: '
                        : 'আনুমানিক ডেলিভারি: '}
                      {calculateEstimatedDeliveryTime()}
                    </p>
                  </div>
                </>
              )}
            </ScrollReveal>

            {/* Order Form */}
            <ScrollReveal className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Delivery Info' : 'ডেলিভারি তথ্য'}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Full Name' : 'সম্পূর্ণ নাম'}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border-0 outline-none ${
                    isDark
                      ? 'bg-gray-700 text-white placeholder-gray-500'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />

                <input
                  type="tel"
                  placeholder={language === 'en' ? 'Phone Number' : 'ফোন নম্বর'}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border-0 outline-none ${
                    isDark
                      ? 'bg-gray-700 text-white placeholder-gray-500'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />

                <textarea
                  placeholder={language === 'en' ? 'Delivery Address' : 'ডেলিভারি ঠিকানা'}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border-0 outline-none resize-none ${
                    isDark
                      ? 'bg-gray-700 text-white placeholder-gray-500'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />

                <textarea
                  placeholder={language === 'en' ? 'Special Notes (optional)' : 'বিশেষ মন্তব্য (ঐচ্ছিক)'}
                  value={formData.specialNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, specialNotes: e.target.value })
                  }
                  rows={2}
                  className={`w-full px-4 py-2 rounded-lg border-0 outline-none resize-none ${
                    isDark
                      ? 'bg-gray-700 text-white placeholder-gray-500'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />

                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => handleSubmitOrder('call')}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                      isDark
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    <Phone size={18} />
                    {language === 'en' ? 'Call to Order' : 'কল করে অর্ডার করুন'}
                  </button>

                  <button
                    onClick={() => handleSubmitOrder('whatsapp')}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                      isDark
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    <MessageCircle size={18} />
                    {language === 'en'
                      ? 'Order on WhatsApp'
                      : 'হোয়াটসঅ্যাপে অর্ডার করুন'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
