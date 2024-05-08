import { IconBaseProps } from "@ant-design/icons/lib/components/Icon";
import { IconType } from "antd/es/notification/interface";

export interface IUser {
    email: string;
    id: string;
    isActivated: boolean;
}

export interface IRegistrationForm {
    email: string;
    password: string;
}

export interface LinkItemProps {
    name: string;
    icon: IconType;
}

export interface IProduct {
    _id: string;
    article: number;
    name: string;
    status?: "attention" | "danger" | "normal";
}

export interface IProductInfo {
    _id: string;
    product: string;
    quantity: number;
    date: Date;
    pricePerUnit: number;
    sellerId: number;
    country: string;
}

export type IProductIndex = keyof IProduct;
export interface NavLink {
    label: string;
    key: string;
    icon?: IconBaseProps;
    children?: NavLink[];
}
