import axios from 'axios'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const OrderForm = ({setIsWindowLoading, getCartInfo, cartIsEmpty}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const orderForm = useRef(null);
    

    const submitOrder = async (data) => {
            const oderData = {
                data:{
                user:{
                    name: data.name,
                    email: data.email,
                    tel: data.tel,
                    address: data.address,
                },
                message: data.message,
                }
            }
            try {
                setIsWindowLoading(true);
                await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, oderData);
                await getCartInfo();
                orderForm.current.reset();
                setIsWindowLoading(false);
                alert('訂單已成功送出！')
            } catch (error) {
                console.log(error);
            } 
        }

    return (   
    <div className="my-5 row justify-content-center">
        <form className="col-md-6" id='orderForm' ref={orderForm} onSubmit= {handleSubmit((data)=>submitOrder(data))}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
            id="email" 
            name="email" 
            type="email" 
            className={`form-control ${errors?.email && "input-error is-invalid"}`} 
            {...register('email', {
                required:"Email 為必填",
                pattern:{
                value:/^\S+@\S+\.\S+$/,
                message:"請輸入正確的 Email 格式"
                }
            })}
            placeholder="請輸入 Email"/>
            { errors.email && <p className='text-start invalid-feedback'>{errors.email?.message}</p> }
            </div>

            <div className="mb-3">
            <label htmlFor="name" className="form-label">收件人姓名</label>
            <input 
            id="name" 
            name="姓名" 
            type="text"
            className={`form-control ${errors?.name && "input-error is-invalid"}`} 
            placeholder="請輸入姓名" 
            {...register("name", {
                required:"姓名為必填",
            })}/>
                { errors.name && <p className='text-start invalid-feedback'>{errors.name?.message}</p> }
            </div>

            <div className="mb-3">
            <label htmlFor="tel" className="form-label">收件人電話</label>
            <input 
            id="tel" 
            name="電話" 
            type="tel" 
            className={`form-control ${errors?.tel && "input-error is-invalid"}`} 
            {...register("tel", {
                required: "電話為必填",
                validate: {
                maxLength: (value) => value.length <= 8 || "電話最多 8 碼",
                isNumber: (value) => /^\d+$/.test(value) || "電話必須為數字"
                }
            })}
            placeholder="請輸入電話" />
            { errors.tel && <p className='text-start invalid-feedback'>{errors.tel?.message}</p> }
            </div>

            <div className="mb-3">
            <label htmlFor="address" className="form-label">收件人地址</label>
            <input 
            id="address" 
            name="地址" 
            type="text" 
            className={`form-control ${errors?.address && "input-error is-invalid"}`} 
            {...register("address", {
                required:"地址為必填",
            })}
            placeholder="請輸入地址" />
            { errors.address && <p className='text-start invalid-feedback'>{errors.address?.message}</p> }
            </div>

            <div className="mb-3">
            <label htmlFor="message" className="form-label">留言</label>
            <textarea id="message"
                className={`form-control ${errors?.message && "input-error is-invalid"}`} 
                cols="30" 
                rows="10"
                {...register("message", {
                validate: {
                    maxLength: (value) => value.length <= 250 || "留言最多 250 字"
                }
                })}
                ></textarea>
                { errors.message && <p className='text-start invalid-feedback'>{errors.message?.message}</p> }
            </div>
            <div className="text-end">
            <button type="submit" className="btn btn-danger" disabled={cartIsEmpty}>送出訂單</button>
            { cartIsEmpty && <div className='text-danger mt-1'>結帳時購物車至少有一商品！</div> }
            </div>
        </form>
    </div>
    )
}

export default OrderForm