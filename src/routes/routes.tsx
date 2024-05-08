import { Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import { PrivateRoute } from "./privateRoutes";
import { MainLayout } from "../components/main.layout";
import { LoginPage } from "../components/login.page";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../components/views/dashboard"));
const ProductsTable = lazy(async () => await import("../components/views/products.table"));
const Stat = lazy(async () => await import("../components/views/stat"));
const Item = lazy(async () => await import("../components/views/item.stat"));
const EditProduct = lazy(async () => await import("../components/views/edit.product"));

export const routes = createRoutesFromElements(
    <Route element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/"
            element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }
        >
            <Route path="dashboard" element={<Dashboard />}></Route>
            {/* <Route path="personal" element={<Items />}></Route> */}
            <Route path="products" element={<ProductsTable />} />
            <Route path="products/:id" element={<Item />}></Route>
            <Route path="products/:id/edit" element={<EditProduct />}></Route>
            <Route path="stat" element={<Stat />} />
        </Route>
    </Route>
);
