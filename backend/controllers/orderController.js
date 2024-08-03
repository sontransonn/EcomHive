import AUTHORDERS from "../models/authOrders.js"
import CUSTOMERORDERS from "../models/customerOrders.js"
import CARTS from "../models/cartsModel.js"

class orderController {
    static order_confirm = async (req, res) => {

    }

    static get_customer_databorad_data = async (req, res) => {

    }

    static get_orders = async (req, res) => {

    }

    static get_order = async (req, res) => {

    }

    static place_order = async (req, res) => {
        try {
            const {
                price, products,
                shipping_fee, shippingInfo, userId
            } = req.body

            console.log(req.body);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static create_payment = async (req, res) => {

    }
}

export default orderController