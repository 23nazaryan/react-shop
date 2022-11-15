import {useContext} from "react";
import {ShopContext} from "../context";

function BasketItem(props) {
    const {id, name, price, quantity, image} = props
    const {
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = useContext(ShopContext)

    return <li className="collection-item avatar">
        <img src={image} alt="name" className="circle"/>
        <span className="title">{name}</span>
        <p>
            <i className="material-icons basket-quantity"
               onClick={() => decQuantity(id)}>remove</i>{' '}
            x{quantity}
            {' '}<i className="material-icons basket-quantity"
                    onClick={() => incQuantity(id)}>add</i>
            {price.finalPrice * quantity}$</p>
        <span className="secondary-content" onClick={() => removeFromBasket(id)}>
            <i className="material-icons basket-delete">close</i>
        </span>
    </li>
}

export default BasketItem