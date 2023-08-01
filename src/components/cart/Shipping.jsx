import React, { useState } from 'react'
import { State } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart);
    const [hNo, setHNo] = useState(shippingInfo.hNo);
    const [state, setState] = useState(shippingInfo.state);
    const [city, setCity] = useState(shippingInfo.city);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: "addShippingInfo",
            payload: {
                hNo,
                state,
                city,
                pinCode,
                phoneNo
            }
        });
        localStorage.setItem("shippingInfo", JSON.stringify({
            hNo,
            state,
            city,
            pinCode,
            phoneNo
        }));
        navigate("/confirmorder")
    }

    return (
        <section className='shipping'>
            <main>
                <h1>Shipping Details</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label>H.No.</label>
                        <input type="text" placeholder='Enter House No.' value={hNo} onChange={(e) => { setHNo(e.target.value) }} />
                    </div>
                    <div>
                        <label>State</label>
                        <select value={state} onChange={(e) => { setState(e.target.value) }}>
                            <option>State</option>

                            {State && State.getStatesOfCountry("IN").map((i) => (
                                <option value={i.isoCode} key={i.isoCode} > {i.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" placeholder='City Here' value={city} onChange={(e) => { setCity(e.target.value) }} />
                    </div>
                    <div>
                        <label>Pincode</label>
                        <input type="number" placeholder='Pincode Here' value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
                    </div>
                    <div>
                        <label>Phone No.</label>
                        <input type="number" placeholder='Phone Number Here' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
                    </div>
                    <button type='submit'>Confirm Order</button>
                </form>
            </main>
        </section >
    )
}

export default Shipping;
