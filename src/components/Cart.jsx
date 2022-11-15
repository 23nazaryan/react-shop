import {useContext} from "react";
import {ShopContext} from "../context";

function Cart() {
    const {order, toggleBasket = Function.prototype} = useContext(ShopContext)

    return <div className="cart amber darken-4 white-text" onClick={toggleBasket}>
        <i className="material-icons">shopping_cart</i>
        {
            order.length ? <span className="cart-quantity">{order.length}</span> : null
        }
    </div>
}

export default Cart