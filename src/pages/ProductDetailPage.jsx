import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import PageSpinnerLoader from "../components/PageSpinnerLoader";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
export default function ProductDetailPage(){
    const [isWindowLoading, setIsWindowLoading] = useState(false);
    const [product , setProduct] = useState({});
    const [productQty, setProductQty] = useState(1);
    const [isWaiting, setIsWaiting] = useState(false);
    const params = useParams();
    
    const getSingleProduct = async (id) => {
        setIsWindowLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
            setProduct(res.data.product);
        } catch (error) {
            alert(error);
        }finally{
            setIsWindowLoading(false);
        }
    }


    const addMultipleProductToCart = async (id, qty) => {
        const addMultipleProduct = {
            data: {
                product_id: id,
                qty: Number(qty)
            }
        }
        setIsWaiting(true);
        try {
            await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, addMultipleProduct);
            alert(`已成功加入 ${qty} 個產品，進入購物車！`)
        } catch (error) {
            alert(error);
        } finally {
            setIsWaiting(false);
            //初始化下拉選單
            setProductQty(1);
        }
    }

    useEffect(()=>{
        getSingleProduct(params.id);
    },[params.id])


    return(
        <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                <img className="img-fluid" src={product.imageUrl} alt={product.title} />
                </div>
                <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                    <h2>{product.title}</h2>
                    <span className="badge text-bg-success">{product.category}</span>
                </div>
                <p className="mb-3 text-start">{product.description}</p>
                <div className="d-flex justify-content-center">
                    <del>NT${product.origin_price}</del>
                    <h5 className="mb-3 ms-2">NT$ {product.price}</h5>
                </div>
                <div className="input-group align-items-center w-100">
                    <select
                    value={productQty}
                    onChange={(e) => setProductQty(e.target.value)}
                    id="qtySelect"
                    className="form-select"
                    >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <option key={index} value={index + 1}>
                        {index + 1}
                        </option>
                    ))}
                    </select>
                    <button type="button" disabled={isWaiting} className="btn btn-primary" onClick={()=> addMultipleProductToCart(product.id, productQty)}>
                    加入購物車
                    </button>
                </div>
                </div>
            </div>
        </div>

        <PageSpinnerLoader isWindowLoading={isWindowLoading}/>
      </>
    )
}