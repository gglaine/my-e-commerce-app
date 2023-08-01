import { Product, Category } from './types';

export const products: Product[] = [
  {
    id: "1",
    label: "Laptop",
    description: "High-end laptop",
    price: 100000,
    category_id: "1",
    thumbnail_url: "image_url"
  },
  {
    id: "2",
    label: "Smartphone",
    description: "Latest model smartphone",
    price: 50000,
    category_id: "1",
    thumbnail_url: "smartphone_image_url"
  },
  {
    id: "3",
    label: "Coffee Maker",
    description: "Automatic coffee maker",
    price: 20000,
    category_id: "2",
    thumbnail_url: "coffee_maker_image_url"
  },
  {
    id: "4",
    label: "Television",
    description: "4K Ultra HD Smart TV",
    price: 40000,
    category_id: "1",
    thumbnail_url: "television_image_url"
  },
  {
    id: "5",
    label: "Refrigerator",
    description: "Double Door Refrigerator",
    price: 30000,
    category_id: "2",
    thumbnail_url: "refrigerator_image_url"
  },
  {
    id: "6",
    label: "Washing Machine",
    description: "Front Load Washing Machine",
    price: 25000,
    category_id: "2",
    thumbnail_url: "washing_machine_image_url"
  }
];

export const categories: Category[] = [
  {
    id: "1",
    index: 0,
    label: "Electronics",
    description: "Electronic products"
  },
  {
    id: "2",
    index: 1,
    label: "Home Appliances",
    description: "Appliances for your home"
  }
  // Add more categories as needed
];
