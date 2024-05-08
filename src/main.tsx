import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes.tsx";
import { Loader } from "./components/forms/loader.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
        </QueryClientProvider>
    </React.StrictMode>
);
