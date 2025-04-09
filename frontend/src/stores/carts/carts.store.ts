import {
    AddProductCart,
    DeletedProdCart,
    FindAllCarts,
    UpdateCart,
} from "@/apis/product-management/carts.apis";
import { ICartItemChange } from "@/interfaces/common/ICart.interface";
import { ICart } from "@/interfaces/models/ICarts.interface";
import { create } from "zustand";

interface CartState {
    cartProduct: ICart | null;
    fetchCartProduct: () => Promise<void>;
    updateCart: (payload: ICartItemChange) => Promise<void>;
    addProductToCart: (payload: ICartItemChange) => Promise<any>;
    deleteCart: (idProduct: string) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
    cartProduct: null,

    addProductToCart: async (payload) => {
        try {
            const response = await AddProductCart(payload);
            await get().fetchCartProduct();
            return response;
        } catch (error) {
            return error
        }
    },

    fetchCartProduct: async () => {
        try {
            const result = await FindAllCarts();
            set({ cartProduct: result?.metadata?.items as any });
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    },

    updateCart: async (payload) => {
        try {
            await UpdateCart(payload);
            await get().fetchCartProduct(); // Lấy lại giỏ hàng sau khi cập nhật
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
        }
    },

    deleteCart: async (idProduct: string) => {
        try {
            await DeletedProdCart(idProduct);
            await get().fetchCartProduct();
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error);
        }
    },
}));
