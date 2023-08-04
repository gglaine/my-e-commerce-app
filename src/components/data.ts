import { Product, Category } from './types';

export const products: Product[] = [
  {
    id: "1",
    label: "Laptop",
    description: "High-end laptop",
    price: 100000,
    category_id: "1",
    thumbnail_url: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
  },
  {
    id: "2",
    label: "Smartphone",
    description: "Latest model smartphone",
    price: 50000,
    category_id: "1",
    thumbnail_url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80"
  },
  {
    id: "3",
    label: "Coffee Maker",
    description: "Automatic coffee maker",
    price: 20000,
    category_id: "2",
    thumbnail_url: "https://images.unsplash.com/photo-1598892294037-0f629bbcefb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
  },
  {
    id: "4",
    label: "Television",
    description: "4K Ultra HD Smart TV",
    price: 40000,
    category_id: "1",
    thumbnail_url: "https://plus.unsplash.com/premium_photo-1689620815896-b61fdab3d733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
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
