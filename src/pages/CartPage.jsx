import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import OrderForm from "../components/OrderForm";
import PageSpinnerLoader from "../components/PageSpinnerLoader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const [cartIsEmpty, setCartIsEmpty] = useState(true);
	const [isWaiting, setIsWaiting] = useState(false);
	const [isWindowLoading, setIsWindowLoading] = useState(false);

	const getCartInfo = async () => {
		try {
			setIsWindowLoading(true);
			const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
			const cartData = res.data.data.carts;
			setCart(cartData);
			setCartTotal(res.data.data.final_total);
			cartData.length === 0 ? setCartIsEmpty(true) : setCartIsEmpty(false);
			setIsWindowLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const cartOriginTotal = cart.reduce((acc, curr) => {
		return curr.product.origin_price * curr.qty + acc;
	}, 0);

	const deleteCartProduct = async () => {
		setIsWaiting(true);
		try {
			await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
			await getCartInfo();
			setCartIsEmpty(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsWaiting(false);
		}
	};

	useEffect(() => {
		getCartInfo();
	}, []);

	return (
		<>
			<div className='container py-4'>
				{cartIsEmpty ? (
					<strong className='text-center fs-4'>購物車是空的QAQ</strong>
				) : (
					<table className='table align-middle'>
						<thead>
							<tr>
								<th></th>
								<th>品名</th>
								<th style={{ width: "150px" }}>數量/單位</th>
								<th>原價</th>
								<th>單價</th>
								<th>小計</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((product) => {
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
													src={product.product.imageUrl}
													alt={product.product.title}
												/>
											</div>
										</td>
										<td>{product.product.title}</td>
										<td>
											<div className='h5'>{product.qty}</div>
										</td>
										<td>
											<div className='h5'>{product.product.origin_price}</div>
										</td>
										<td>
											<div className='h5'>{`特價 ${product.product.price}`}</div>
										</td>
										<td>
											<div className='h5'>{product.final_total}</div>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td></td>
								<td colSpan='3' className='text-end'>
									總計
								</td>
								<td className='text-end'>{cartOriginTotal}</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td colSpan='3' className='text-end text-success'>
									折扣價
								</td>
								<td className='text-end text-success'>{cartTotal}</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td colSpan='3' className='text-end text-danger'>
									本次省下
								</td>
								<td className='text-end text-danger'>
									{cartOriginTotal - cartTotal}
								</td>
							</tr>
						</tfoot>
					</table>
				)}

				<div className='text-end my-3'>
					<button
						className='btn btn-outline-danger'
						type='button'
						disabled={isWaiting || cartIsEmpty}
						onClick={deleteCartProduct}>
						清空購物車
						{isWaiting && <ClipLoader color='#000' size={15} />}
					</button>
				</div>

				<OrderForm
					setIsWindowLoading={setIsWindowLoading}
					getCartInfo={getCartInfo}
					cartIsEmpty={cartIsEmpty}
				/>

				<PageSpinnerLoader isWindowLoading={isWindowLoading} />
			</div>
		</>
	);
}
