import {
  Cake,
  Coffee,
  Fish,
  IceCream,
  Leaf,
  Pizza,
  Spade,
  Star,
} from 'lucide-react';

interface CategoryOption {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const restaurantCategories: CategoryOption[] = [
  {
    label: 'Italian',
    value: 'italian',
    icon: Pizza,
  },
  {
    label: 'Chinese',
    value: 'chinese',
    icon: Fish,
  },
  // {
  //   label: 'Japanese',
  //   value: 'japanese',
  //   icon: Restaurant,
  // },
  // {
  //   label: 'Mexican',
  //   value: 'mexican',
  //   icon: Hotdog,
  // },
  {
    label: 'Indian',
    value: 'indian',
    icon: Spade,
  },
  // {
  //   label: 'American',
  //   value: 'american',
  //   icon: Burger,
  // },
  {
    label: 'Seafood',
    value: 'seafood',
    icon: Fish,
  },
  {
    label: 'Vegetarian',
    value: 'vegetarian',
    icon: Leaf,
  },
  {
    label: 'Vegan',
    value: 'vegan',
    icon: Leaf,
  },
  // {
  //   label: 'Fast Food',
  //   value: 'fast_food',
  //   icon: Burger,
  // },
  {
    label: 'Bakery',
    value: 'bakery',
    icon: Cake,
  },
  {
    label: 'Coffee Shop',
    value: 'coffee_shop',
    icon: Coffee,
  },
  // {
  //   label: 'Bar',
  //   value: 'bar',
  //   icon: GlassWine,
  // },
  {
    label: 'Dessert',
    value: 'dessert',
    icon: IceCream,
  },
  // {
  //   label: 'Buffet',
  //   value: 'buffet',
  //   icon: Restaurant,
  // },
  {
    label: 'Steakhouse',
    value: 'steakhouse',
    icon: Star,
  },
  // Adicione mais categorias conforme necessário
];
