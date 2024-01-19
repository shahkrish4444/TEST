import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Count, Decrement, Delete, DeleteAll, Increment } from './reduxThunk/Action';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const total = useSelector((state) => state.total)
    const [noRecords, setNoRecords] = useState(false);

    const Discount = 0.15
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart.length === 0) {
            setNoRecords(true);
        } else {
            setNoRecords(false);
        }
        dispatch(Count())
    }, [cart])


    const handleDelete = (id) => {
        dispatch(Delete(id))
    }

    const handleIncrement = (id) => {
        dispatch(Increment(id))
        // console.log(id)
    }
    const handleDecrement = (id) => {
        dispatch(Decrement(id))
        // console.log(id)
    }
    const handleDeleteAll = () => {
        dispatch(DeleteAll())
    }
    return (
        <div className='container px-3'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Cart / <span className='text-theme fs-6'>product</span></h4>
                </div>
                <div>
                    <Link className='btn btn-primary px-4 py-6 fs-6 me-2' to={'/product'}>Product<i className="fa-solid fa-cart-arrow-down ms-2"></i></Link>
                    <Link className='btn btn-danger  px-4 py-6 fs-6' onClick={handleDeleteAll} >Delete All<i className="fa-solid fa-trash-can ms-2"></i></Link>
                </div>
            </div>

            <div className="row">
                <div className="col-9">
                    <div className="dark-card p-0 ">
                        <div className="cart-heading p-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                            <h5 className="m-0 text-theme ">Shopping Cart</h5>
                        </div>
                        <div className="cart-body p-3 " style={{ height: "60vh", overflowY: "scroll" }}>
                            <table class="table">
                                <thead>
                                    <tr className='text-theme'>
                                        <th scope="col">PRODUCT</th>
                                        <th scope="col">QUANTITY</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {noRecords ? (
                                        <>
                                            <td className='text-center fw-bold  pe-0 py-5' colSpan={4}>Your Cart is Empty</td>
                                        </>
                                    ) : (
                                        cart && cart.map((item, id) => {
                                            console.log(item.id)
                                            return (
                                                <tr key={id}>
                                                    <td >
                                                        <img src={item.image} alt="" className='img-fluid' style={{ height: '70px', width: "70px", borderRadius: "3px" }} />
                                                        <span className='ms-3'>{item.name}</span></td>
                                                    <td >
                                                        <button className='btn  text-white rounded-0 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleIncrement(id)}>+</button>
                                                        <span className='btn text-theme rounded-0 ' style={{ border: "1px solid #bfc8de" }}>{item.qty}</span>
                                                        <button className='btn text-white rounded-0 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleDecrement(id)}>-</button></td>
                                                    <td>${item.price}</td>
                                                    <td><button className='btn' onClick={() => handleDelete(id)}><i class="fa-solid fa-trash-can text-danger fs-5"></i></button></td>
                                                </tr>
                                            )
                                        })
                                    )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    )
}

export default Cart
