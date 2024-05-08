import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IProduct, IProductInfo } from "../../types/types";

class ProductService {
    async getAllProducts(): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>("/products");
    }
    async getAllTransactions(): Promise<AxiosResponse<IProductInfo[]>> {
        return $api.get<IProductInfo[]>("/transactions");
    }
    async getInfoByProductId(id: string): Promise<AxiosResponse<IProductInfo[]>> {
        return $api.get<IProductInfo[]>(`/transactions/${id}`);
    }
    async getProductById(id: string): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>(`/products/${id}`);
    }
}

export const productService = new ProductService();
