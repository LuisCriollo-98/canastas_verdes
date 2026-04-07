import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, ShopingCart } from "./schemas";
interface Store {
    total: number;
    contents: ShopingCart
    addToCart: (product: Product) => void
    updateQuantity: (id: Product['id'], quantity: number) => void //actualiza la cantidad de un producto en el carrito desde el select
}
//devtools permite ver el estado en el navegador
export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    contents: [],

    //funcion para agregar productos al carrito
    addToCart: (product) => {
        const { id: productId, ...data } = product
        let contents: ShopingCart = []
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
    },
    //funcion para actualizar la cantidad de un producto en el carrito desde el select
    updateQuantity: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? { ...item, quantity } : item)
        set(() => ({
            contents,
        }))
    }
}
)))    