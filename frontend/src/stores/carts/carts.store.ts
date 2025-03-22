import { FindAllCarts } from "@/apis/product-management/carts.apis";
import { ICart } from "@/interfaces/models/carts.interface";
import { create } from "zustand";

interface CartState {
    cartProduct: ICart | null;
    fetchCartProduct: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    cartProduct: null,

    fetchCartProduct: async () => {
        try {
            const result = await FindAllCarts();
            set({ cartProduct: result?.metadata?.items as any });
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    },
}));
