import React from 'react'

const CartItem = ({ value, title, img, increase, decrease }) => {
    return (

        <div className="cartItem">
            <div>
                <h4>{title}</h4>
                <img src={img} alt="item" />
            </div>
            <div>
                <button onClick={decrease}>-</button>
                <input type="number" readOnly value={value} />
                <button onClick={increase}>+</button>
            </div>
        </div>
    )
}
export default CartItem;
