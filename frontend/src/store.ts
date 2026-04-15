import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, ShoppingCart} from "./schemas";
interface Store {
    total: number;
    contents: ShoppingCart
    addToCart: (product: Product) => void
    updateQuantity: (id: Product['id'], quantity: number) => void //actualiza la cantidad de un producto en el carrito desde el select
    removeFromCart: (id: Product['id']) => void //elimina un producto del carrito
    calculateTotal: () => void
    clearCart: () => void
}
//devtools permite ver el estado en el navegador
export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    contents: [],
    //funcion para agregar productos al carrito
    addToCart: (product) => {
        const { id: productId, ...data } = product
        let contents: ShoppingCart = []
        const duplicated = get().contents.findIndex(item => item.productId === productId)

        // validacion de si el producto ya existe en el carrito solo aumenta la cantidad
        if (duplicated >= 0) {
            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            } : item)
        } else {
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId,
            }]
        }
            set(() => ({
            contents,
        }))
        get().calculateTotal()
    },
    //funcion para actualizar la cantidad de un producto en el carrito desde el select
    updateQuantity: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? { ...item, quantity } : item)
        set(() => ({
            contents,
        }))
        get().calculateTotal()
    },
    //funcion para eliminar un producto del carrito
    removeFromCart: (id) => {
        const contents = get().contents.filter(item => item.productId !== id)
        set(() => ({
            contents,
        }))
        if(!get().contents.length){
            get().clearCart()
        }
        get().calculateTotal()
    },
    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => total + (item.quantity*item.priceFinal), 0)
        set(() => ({
            total,
        }))
    },
    clearCart: () => {
        set(() => ({
            contents: [],
            total: 0,
        }))
    }
})))    