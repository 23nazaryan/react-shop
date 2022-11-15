import {useEffect, useContext} from "react";
import {ShopContext} from "../context";

function Alert() {
    const {
        alertName = [],
        closeAlert = Function.prototype
    } = useContext(ShopContext)

    useEffect(() => {
        const timerID = setTimeout(closeAlert, 3000)
        return () => clearTimeout(timerID)
        // eslint-disable-next-line
    }, [alertName])

    return <div id="toast-container">
        <div className="toast green accent-4">{alertName} added to basket</div>
    </div>
}

export default Alert