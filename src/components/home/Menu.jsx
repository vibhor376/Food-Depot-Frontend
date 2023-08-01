import React from 'react'
import MenuCard from './MenuCard';
import burger1 from '../../assets/burger1.png';
import burger2 from '../../assets/burger2.png';
import burger3 from '../../assets/burger4.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
const Menu = () => {
    const dispatch = useDispatch();
    const addToCartHandler = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "cheeseBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                toast.success("Item added to cart");
                break;
            case 2:
                dispatch({ type: "vegBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                toast.success("Item added to cart");
                break;
            case 3:
                dispatch({
                    type: "burgerWithFriesIncrease"
                });
                dispatch({ type: "calculatePrice" });
                toast.success("Item added to cart");
                break;
            default:
                dispatch({ type: "cheeseBurgerIncrease" });
                dispatch({ type: "calculatePrice" });
                toast.success("Item added to cart");
                break;
        }
    }

    return (
        <section id="menu">
            <h1>MENU</h1>
            <div>
                <MenuCard
                    item={1}
                    burgerSrc={burger1} price={200} title="Cheese Burger"
                    handler={addToCartHandler}
                    delay={0.1} />
                <MenuCard
                    item={2}
                    burgerSrc={burger2} price={300}
                    title="Veg Cheese Burger"
                    handler={addToCartHandler}
                    delay={0.5} />
                <MenuCard
                    item={3}
                    burgerSrc={burger3}
                    price={500} title="Cheese Burger with Fries"
                    handler={addToCartHandler}
                    delay={0.8} />
            </div>
        </section>
    )
}
export default Menu;