import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../config";
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(() => {
        return localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : []
    })
    const [isBasketShow, setBasketShow] = useState(false)
    const [alertName, setAlertName] = useState('')

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY
            }
        }).then(res => res.json())
            .then(data => {
                if (data.result) {
                    setGoods(data.shop)
                } else {
                    setGoods([])
                }

                setLoading(false)
            })
            .catch(e => {
                console.error(e)
                setGoods([])
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order))
    }, [order])

    const addToBasket = item => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }

            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })

            setOrder(newOrder)
        }

        setAlertName(item.name)
        //localStorage.setItem('order', order)
    }

    const removeFromBasket = id => {
        setOrder(order.filter(item => item.id !== id))
    }

    const incQuantity = id => {
        const newOrder = order.map(orderItem => {
            if (orderItem.id === id) {
                const newQuantity = orderItem.quantity + 1

                return {
                    ...orderItem,
                    quantity: newQuantity
                }
            } else return orderItem
        })

        setOrder(newOrder)
    }

    const decQuantity = id => {
        const newOrder = order.map(orderItem => {
            if (orderItem.id === id) {
                const newQuantity = orderItem.quantity - 1

                return {
                    ...orderItem,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            } else return orderItem
        })

        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }

    const closeAlert = () => {
        setAlertName('')
    }

    return (<main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {
            loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket}/>
        }
        {isBasketShow &&
            <BasketList
                order={order}
                handleBasketShow={handleBasketShow}
                removeFromBasket={removeFromBasket}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
            />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert} />
        }
    </main>)
}

export default Shop