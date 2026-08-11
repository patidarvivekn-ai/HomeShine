import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'homeshine-cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items.filter((item) => (
        item?.cartKey
        && item?.name
        && Number(item.price) > 0
        && Number(item.qty) > 0
      )),
    };
  } catch {
    return { items: [] };
  }
}

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
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      // Ignore quota / private-mode failures.
    }
  }, [state.items]);

  const addItem = (item) => {
    if (!item?.price || item.price <= 0) return;
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);
  const qtyFor = (cartKey) => state.items.find((item) => item.cartKey === cartKey)?.qty || 0;
  const qtyForService = (serviceId) => state.items
    .filter((item) => item.serviceId === serviceId)
    .reduce((sum, item) => sum + item.qty, 0);
  const qtyForVariant = (serviceId, variant) => state.items
    .filter((item) => item.serviceId === serviceId && item.variant === variant)
    .reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      total,
      count,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      qtyFor,
      qtyForService,
      qtyForVariant,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
