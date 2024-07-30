import adminRoutes from "./adminRoutes";
import sellerRoutes from "./sellerRoutes";

const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
]

export default privateRoutes