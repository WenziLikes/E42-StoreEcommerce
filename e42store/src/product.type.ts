export const categories = [
    {id: 1, name: "Books"},
    {id: 2, name: "Electronics"},
    {id: 3, name: "Home & Kitchen"},
    {id: 4, name: "Gift Cards"},
    {id: 5, name: "Clothing & Shoes"},
    {id: 6, name: "Jewellery"},
];

// Interface for Firebase TimeStamp
export interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}

// Slide interfaces (carousel)
export interface ISlideType {
    id: string | number;
    image: string;
    title: string;
    heading: string;
    desc: string;
    subHeading: string;
}

// Authorization interface
export interface AuthState {
    isLoggedIn: boolean;
    email: string | null;
    userName: string | null;
    userID: string | number | null;
}

// Product Interface
export interface Product {
    id: string;
    name: string;
    imageURL: string;
    price: number;
    category: string;
    brand: string;
    desc: string;
    createdAt: FirebaseTimestamp | string | Date | null;
    editedAt?: string | null;  // ✅ Add `editeDat`
}

//Product state interface
export interface ProductState {
    products: Product[];
    minPrice: number;
    maxPrice: number;
}

// Filters status interface
export interface FilterState {
    filteredProducts: Product[];
}

// Basket interfaces
export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageURL: string;
    cartQuantity: number;
}

export interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
    previousURL: string;
}

// Interfaces for delivery addresses
export interface BillingAddress {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
}

export interface ShippingAddress {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
}

export interface ShippingAddressState {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
}

// Interfaces for orders history
export interface OrderHistory {
    id: string;
    userID: string;
    orderDate: string;
    orderTime: string;
    orderAmount: number;
    orderStatus: string;
}

export interface OrderHistoryState {
    orderHistory: OrderHistory[];
    totalOrderAmount: null | number;
}

// Interface for orders
export interface OrderState {
    cartItems: CartItem[];
    id: string;
    orderAmount: number;
    orderDate: string;
    orderStatus: string;
    orderTime: string;
    shippingAddress: ShippingAddressState;
    userEmail: string;
    userID: string;
    createdAt: FirebaseTimestamp | string | Date | null;
}