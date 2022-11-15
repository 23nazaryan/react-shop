import {useContext} from "react";
import {ShopContext} from "../context";

function GoodsItem(props) {
    const {
        mainId: id,
        displayName: name,
        displayDescription: description,
        price,
        displayAssets: assets
    } = props

    const {addToBasket} = useContext(ShopContext)

    return <div className="card">
        <div className="card-image">
            <img src={assets[0].full_background} alt={name}/>
        </div>
        <div className="card-content">
            <span className="card-title">{name}</span>
            <p>{description}</p>
        </div>
        <div className="card-action">
            <button className="btn" onClick={() => addToBasket({id, name, price, image: assets[0].background})}>Pay</button>
            <span className="right" style={{fontSize: '1.8rem'}}>{price.finalPrice}$</span>
        </div>
    </div>
}

export default GoodsItem