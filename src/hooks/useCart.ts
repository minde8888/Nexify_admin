import { useState, useEffect } from 'react';

// Define the shape of a product in the cart
interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the cart context
interface CartContext {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

// Custom hook for managing the shopping cart state
const useCart = (): CartContext => {
  // Initialize cart state
  const [cart, setCart] = useState<CartProduct[]>([]);

  // Add a product to the cart
  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // If the product is not in the cart, add it
        return [...prevCart, product];
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // You can also use useEffect to persist the cart state to local storage
  useEffect(() => {
    // Example: Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
