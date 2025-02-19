import { IBaseResponse, IGetManyItem } from "@/interfaces/common/IBaseResponse.interface";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import { create } from "zustand";

type State = {
    productStore: IProductCategory[] | [];
    setProduct: (productData: IProductCategory[]) => void;
};

export const useProductStore = create<State>((set) => ({
    productStore: [],
    setProduct: (productData) => set({ productStore: productData }),
}));
