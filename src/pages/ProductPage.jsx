import { useEffect, useState } from "react";
import axios from "axios";
import PageSpinnerLoader from "../components/PageSpinnerLoader";

import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductPage() {
	const [products, setProducts] = useState([]); // 產品列表
	const [isWindowLoading, setIsWindowLoading] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	const getProducts = async () => {
		setIsWindowLoading(true);
		try {
			const res = await axios.get(
				`${BASE_URL}/v2/api/${API_PATH}/products/all`
			);
			setProducts(res.data.products);
		} catch (error) {
			console.error(error);
		} finally {
			setIsWindowLoading(false);
		}
	};

	const addSingleProductToCart = async (id) => {
		const addSingleProduct = {
			data: {
				product_id: id,
				qty: 1,
			},
		};
		setIsWaiting(true);
		try {
			await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, addSingleProduct);
			alert("已成功加入購物車！");
		} catch (error) {
			alert(error);
		} finally {
			setIsWaiting(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<div className='container py-4'>
				<table className='table align-middle'>
					<thead>
						<tr>
							<th>圖片</th>
							<th>商品名稱</th>
							<th>價格</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td style={{ width: "200px" }}>
										<div>
											<img
												style={{
													height: "100px",
													backgroundSize: "cover",
													backgroundPosition: "center",
													objectFit: "cover",
												}}
												src={product.imageUrl}
												alt={product.title}
											/>
										</div>
									</td>
									<td>{product.title}</td>
									<td>
										<div className='h5'>{`特價 ${product.price}`}</div>
										<del className='h6'>{product.origin_price}</del>
									</td>
									<td>
										<div className='btn-group btn-group-sm'>
											<Link
												to={`/product/${product.id}`}
												className='btn btn-outline-secondary'>
												查看更多
											</Link>
											<button
												disabled={isWaiting}
												type='button'
												className='btn btn-outline-danger'
												onClick={() => addSingleProductToCart(product.id)}>
												<i className='fas fa-spinner fa-pulse'></i>
												加到購物車
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<PageSpinnerLoader isWindowLoading={isWindowLoading} />
		</>
	);
}
