const categoryAliases: Record<string, string> = {
  biryani: 'biryani',
  biriani: 'biryani',
  polao: 'biryani',
  tehari: 'tehari',
  tehar: 'tehari',
  snacks: 'snacks',
  snack: 'snacks',
  kabab: 'snacks',
  haleem: 'snacks',
  naan: 'snacks',
  fry: 'snacks',
  chaap: 'snacks',
  chotpoti: 'snacks',
  fuchka: 'snacks',
  samosa: 'snacks',
  drinks: 'drinks',
  drink: 'drinks',
  yogurt: 'drinks',
  borhani: 'drinks',
  lassi: 'drinks',
  iced: 'drinks',
  burhani: 'drinks',
  desserts: 'desserts',
  dessert: 'desserts',
  sweet: 'desserts',
  khir: 'desserts',
  firni: 'desserts',
  golapjamun: 'desserts',
};

function humanizeCategoryLabel(category: string) {
  return category
    .trim()
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeMenuCategory(value?: string | null): string {
  const normalizedValue = (value ?? '').trim().toLowerCase();

  if (!normalizedValue) {
    return 'snacks';
  }

  const matchedCategory = Object.entries(categoryAliases).find(([alias]) =>
    normalizedValue.includes(alias),
  );

  return matchedCategory ? matchedCategory[1] : normalizedValue;
}

export function getMenuCategoryLabel(category: string, language: 'en' | 'bn' = 'en') {
  const categoryMap: Record<string, { en: string; bn: string }> = {
    biryani: { en: 'Biryani', bn: 'বিরিয়ানি' },
    tehari: { en: 'Tehari', bn: 'তেহারি' },
    snacks: { en: 'Snacks', bn: 'খাবার' },
    drinks: { en: 'Drinks', bn: 'পানীয়' },
    desserts: { en: 'Desserts', bn: 'মিষ্টি' },
  };

  const normalizedCategory = normalizeMenuCategory(category);
  if (categoryMap[normalizedCategory]) {
    return categoryMap[normalizedCategory][language];
  }

  if (language === 'bn') {
    return humanizeCategoryLabel(category);
  }

  return humanizeCategoryLabel(category);
}

export function getMenuCategoryOptions(
  language: 'en' | 'bn' = 'en',
  availableCategories: string[] = [],
) {
  const categories = availableCategories.length
    ? Array.from(
        new Set(
          availableCategories
            .map((category) => normalizeMenuCategory(category))
            .filter(Boolean),
        ),
      )
    : ['biryani', 'tehari', 'snacks', 'drinks', 'desserts'];

  return [
    { id: 'all', label: language === 'en' ? 'All' : 'সবকিছু' },
    ...categories.map((category) => ({
      id: category,
      label: getMenuCategoryLabel(category, language),
    })),
  ];
}
