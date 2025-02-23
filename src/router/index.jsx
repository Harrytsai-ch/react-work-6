import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FontLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

const router = createHashRouter([
    {
        path:'/',
        element:<FrontLayout />,
        children: [
            {
                path:'',
                element:<HomePage />
            },
            {
                path:'product',
                element:<ProductPage />
            },
            {
                path:'product/:id',
                element:<ProductDetailPage />
            },
            {
                path:'cart',
                element:<CartPage />
            }
        ]
    }
])

export default router;