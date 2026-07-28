export const formatPrice = (price: number, currency: string = '৳'): string => {
  return `${currency}${price.toLocaleString('en-BD')}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as Bangladesh phone number
  return `+${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
};

export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

export const calculateEstimatedDeliveryTime = (baseTime: number = 35): string => {
  const now = new Date();
  const deliveryTime = new Date(now.getTime() + baseTime * 60000);
  return deliveryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const convertTo12Hour = (time24: string): string => {
  const [hours, minutes] = time24.split(':');
  let hour = parseInt(hours, 10);
  const minute = minutes;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

type BusinessHours = Record<string, { open: string; close: string }>;

export const isRestaurantOpen = (dayHours: BusinessHours): boolean => {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayNames[dayIndex];
  
  if (!dayHours[todayKey]) return false;
  
  const { open, close } = dayHours[todayKey];
  const [openHour, openMin] = convertToMinutes(open);
  const [closeHour, closeMin] = convertToMinutes(close);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  return currentTime >= openHour * 60 + openMin && currentTime <= closeHour * 60 + closeMin;
};

const convertToMinutes = (time: string): [number, number] => {
  const [time24, period] = time.split(' ');
  const [hours, minutes] = time24.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) return [hours + 12, minutes];
  if (period === 'AM' && hours === 12) return [0, minutes];
  
  return [hours, minutes];
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
