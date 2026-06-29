import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.cartKey === action.payload.cartKey);
      if (existing >= 0) {
        return {
          ...state,
          items: state.items.map((item, idx) =>
            idx === existing ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== action.payload.cartKey) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.payload.cartKey ? { ...i, qty: action.payload.qty } : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
