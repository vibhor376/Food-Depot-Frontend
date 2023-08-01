import React, { useEffect } from 'react'
import CartItem from './CartItem';
import burger1 from '../../assets/burger1.png';
import burger2 from '../../assets/burger2.png';
import burger3 from '../../assets/burger4.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const dispatch = useDispatch();
    const {
        cartItems: {
            cheeseBurger: {
                quantity: cheeseBurger
            },
            vegBurger: {
                quantity: vegBurger
            },
            burgerWithFries: {
                quantity: burgerWithFries
            }
        },
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = useSelector((state) => state.cart);
    const { cartItems: orderItems } = useSelector(state => state.cart);
    const increase = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "cheeseBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "vegBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({
                    type: "burgerWithFriesIncrease"
                });
                dispatch({ type: "calculatePrice" });
                break;
            default:
                dispatch({ type: "cheeseBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    }
    const decrease = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "cheeseBurgerDecrease" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "vegBurgerDecrease" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({
                    type: "burgerWithFriesDecrease"
                });
                dispatch({ type: "calculatePrice" });
                break;
            default:
                dispatch({ type: "cheeseBurgerDecrease" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    };
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem("amountValues", JSON.stringify({
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount
        }));
    }, [orderItems, itemsPrice, taxPrice, shippingCharges, totalAmount])

    return (<>
        <section className='cart'>
            <main>
                <CartItem
                    value={cheeseBurger}
                    title={"Cheese Burger"}
                    img={burger1}
                    increase={() => increase(1)}
                    decrease={() => decrease(1)}
                />
                <CartItem
                    value={vegBurger}
                    title={"Veg Cheese Burger"}
                    img={burger2}
                    increase={() => increase(2)}
                    decrease={() => decrease(2)}
                />
                <CartItem
                    value={burgerWithFries}
                    title={"Cheese Burger with Fries"}
                    img={burger3}
                    increase={() => increase(3)}
                    decrease={() => decrease(3)}
                />
                <article>
                    <div>
                        <h4>Sub Total</h4>
                        <p>₹{itemsPrice}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>₹{taxPrice}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>₹{shippingCharges}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>₹{totalAmount}</p>
                    </div>
                    <Link to="/shipping"> Checkout </Link>
                </article>
            </main>
        </section >
    </>
    )
}

export default Cart;
