import {useContext} from "react";
import {ShopContext} from "../context";
import BasketItem from "./BasketItem";

function BasketList() {
    const {order = [], toggleBasket} = useContext(ShopContext)
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price.finalPrice * el.quantity
    }, 0)

    return <ul className="collection basket-list">
        <li className="collection-item active">Basket</li>
        {order.length ? (
            order.map(item => (<BasketItem
                key={item.id}
                {...item} r
            />))
        ) : (
            <li className="collection-item avatar">Basket is empty</li>
        )}
        <li className="collection-item active">Total Amount: {totalPrice}$</li>
        <i className="material-icons basket-close" onClick={toggleBasket}>close</i>
    </ul>
}

export default BasketList