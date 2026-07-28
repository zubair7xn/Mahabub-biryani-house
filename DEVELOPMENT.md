# Development Guide - Mahabub Biryani House Website

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Data Management](#data-management)
4. [Component Development](#component-development)
5. [Styling & Theme](#styling--theme)
6. [Animations](#animations)
7. [Language Support](#language-support)
8. [Images & Media](#images--media)
9. [Performance Tips](#performance-tips)
10. [Troubleshooting](#troubleshooting)

## Quick Start

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173 in your browser

# 4. To build for production
npm run build

# 5. To preview production build
npm run preview
```

## Project Structure

### Key Directories

#### `src/components/`
Reusable UI components used across pages:
- `Navbar.tsx` - Main navigation with language/theme toggle
- `Footer.tsx` - Footer with contact info and links
- `FloatingButtons.tsx` - Floating action buttons
- `HeroSection.tsx` - Large banner section
- `Features.tsx` - Features grid
- `Statistics.tsx` - Animated counters
- `PopularDishes.tsx` - Popular menu items grid
- `ReviewCard.tsx` - Individual review card
- `ReviewsSection.tsx` - Reviews collection
- `MenuItemCard.tsx` - Food item card with image and price
- `AnimationWrappers.tsx` - Animation wrapper components

#### `src/pages/`
Full page components for routing:
- `HomePage.tsx` - Main landing page
- `MenuPage.tsx` - Full menu with filters
- `GalleryPage.tsx` - Image gallery with lightbox
- `ReviewsPage.tsx` - Customer reviews
- `AboutPage.tsx` - Restaurant info and timeline
- `ContactPage.tsx` - Contact form and FAQs
- `OrderPage.tsx` - Order management

#### `src/data/`
Static data files (easy to update):
- `menu.ts` - All menu items
- `reviews.ts` - Customer testimonials
- `gallery.ts` - Gallery images
- `restaurant.ts` - Restaurant info, FAQs, features

#### `src/utils/`
Helper functions and utilities:
- `helpers.ts` - Format price, phone, etc.
- `animations.ts` - Reusable animation configs
- `i18n.ts` - Language translations

#### `src/types/`
TypeScript type definitions:
- `index.ts` - All interfaces and types

## Data Management

### Adding Menu Items

Edit `src/data/menu.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Dish Name',
  namebengali: 'খাবারের নাম',
  description: 'Detailed description',
  category: 'biryani' | 'tehari' | 'snacks' | 'drinks' | 'desserts',
  price: 300,
  image: 'https://images.unsplash.com/...',
  isPopular: true,  // Shows "Popular" badge
  rating: 4.8,      // 1-5 stars
  servingSize: 'Serves 2',
}
```

### Adding Gallery Images

Edit `src/data/gallery.ts`:

```typescript
{
  id: 'unique-id',
  src: 'https://images.unsplash.com/...',
  alt: 'Image description',
  category: 'food' | 'restaurant' | 'kitchen' | 'customers' | 'events',
}
```

### Adding Reviews

Edit `src/data/reviews.ts`:

```typescript
{
  id: '1',
  name: 'Customer Name',
  avatar: 'https://api.dicebear.com/...',
  rating: 5,
  text: 'Review text here...',
  date: '2 weeks ago',
  platform: 'google' | 'local' | 'facebook',
}
```

### Updating Restaurant Info

Edit `src/data/restaurant.ts`:

```typescript
export const restaurantInfo = {
  name: 'Mahabub Biryani House',
  phone: '+880-1234-567890',
  address: 'Rajashon Road, Savar, Dhaka',
  businessHours: {
    monday: { open: '10:00 AM', close: '11:00 PM' },
    // ... other days
  },
  // ... more fields
}
```

## Component Development

### Creating a New Component

```typescript
// src/components/MyComponent.tsx
import { motion } from 'framer-motion';
import { ScrollReveal } from './AnimationWrappers';

interface MyComponentProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

export function MyComponent({ isDark, language }: MyComponentProps) {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Component content */}
      </motion.div>
    </ScrollReveal>
  );
}
```

### Using Components in Pages

```typescript
import { MyComponent } from '../components/MyComponent';

export function MyPage({ isDark, language }: PageProps) {
  return (
    <main>
      <MyComponent isDark={isDark} language={language} />
    </main>
  );
}
```

## Styling & Theme

### Tailwind CSS Classes

Use Tailwind for styling. Key prefixes:
- `dark:` - Dark mode styles
- `hover:` - Hover states
- `focus:` - Focus states
- `active:` - Active states
- `md:` / `lg:` - Responsive breakpoints

### Custom Colors

Add custom colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'custom-color': '#123456',
    }
  }
}
```

### Dark Mode

Use `isDark` prop to toggle between light and dark:

```typescript
className={`
  text-gray-900 
  ${isDark ? 'dark:text-white' : 'text-gray-900'}
`}
```

Or use the `dark:` prefix directly (Tailwind handles it):

```typescript
className="bg-white dark:bg-gray-800"
```

## Animations

### Available Animations

From `src/utils/animations.ts`:

- `fadeIn` - Fade in animation
- `slideInUp` - Slide up animation
- `slideInDown` - Slide down animation
- `slideInLeft` - Slide left animation
- `slideInRight` - Slide right animation
- `scaleIn` - Scale animation
- `staggerContainer` - Container for staggering
- `staggerItem` - Item in stagger container
- `floatingAnimation` - Floating effect
- `pulseAnimation` - Pulse effect

### Using Animations

```typescript
import { motion } from 'framer-motion';
import { slideInUp } from '../utils/animations';

<motion.div
  initial={slideInUp.initial}
  animate={slideInUp.animate}
  transition={slideInUp.transition}
>
  Content
</motion.div>
```

### Using Wrapper Components

```typescript
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/AnimationWrappers';

<StaggerContainer>
  <div className="grid grid-cols-3">
    <StaggerItem>Item 1</StaggerItem>
    <StaggerItem>Item 2</StaggerItem>
    <StaggerItem>Item 3</StaggerItem>
  </div>
</StaggerContainer>
```

## Language Support

### Adding New Language

1. Update `src/utils/i18n.ts`:

```typescript
export const translations = {
  en: { /* ... */ },
  bn: { /* ... */ },
  new_lang: {
    nav: {
      home: 'Home',
      // ... all keys
    }
  }
}

export type Language = 'en' | 'bn' | 'new_lang';
```

2. Use language in components:

```typescript
interface MyComponentProps {
  language: 'en' | 'bn';
}

export function MyComponent({ language }: MyComponentProps) {
  return (
    <h1>
      {language === 'en' ? 'Welcome' : 'স্বাগতম'}
    </h1>
  );
}
```

## Images & Media

### Image URLs

All image URLs are centralized in data files:
- Menu items: `src/data/menu.ts`
- Gallery: `src/data/gallery.ts`

### Updating Images

Replace URLs with your own from:
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://www.pexels.com/
- **Your own**: Upload to CDN or hosting

### Image Optimization

Vite automatically optimizes images. For best performance:
1. Use responsive images with srcset
2. Compress before uploading
3. Use WebP format when possible

## Performance Tips

### 1. Code Splitting
Routes are automatically code-split with React Router.

### 2. Image Lazy Loading
Implement with Intersection Observer:

```typescript
const [isVisible, setIsVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setIsVisible(true);
  });
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

return (
  <img 
    ref={ref}
    src={isVisible ? imageSrc : placeholder}
    alt="description"
  />
);
```

### 3. Memoization
Use React.memo for expensive components:

```typescript
export const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.content}</div>;
});
```

### 4. Build Optimization
```bash
npm run build  # Creates optimized production build
```

## Troubleshooting

### Issue: Theme not persisting
**Solution**: Check localStorage in browser DevTools. Theme is saved to `localStorage.theme` and `localStorage.language`.

### Issue: Images not loading
**Solution**: 
1. Check image URLs are correct
2. Verify CORS if using external images
3. Check browser console for errors

### Issue: Animations stuttering
**Solution**:
1. Reduce animation complexity
2. Use `will-change` CSS property
3. Test in production build (faster than dev)

### Issue: Build size too large
**Solution**:
1. Check dependencies with `npm ls`
2. Remove unused packages
3. Use dynamic imports for heavy libraries

### Issue: Dark mode not applying
**Solution**:
1. Ensure `isDark` prop is passed correctly
2. Check Tailwind dark mode is configured
3. Verify CSS classes have `dark:` prefix

---

## Quick Reference

### Color Variables
- Primary: `#d4af37` (Gold)
- Dark Green: `#1a5d4f`
- Accent: `#f59e0b` (Amber)

### Spacing Scale
- `p-4` = 1rem padding
- `p-6` = 1.5rem padding
- `p-8` = 2rem padding

### Responsive Breakpoints
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

---

For more help, refer to documentation of:
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
