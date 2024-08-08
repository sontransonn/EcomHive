import navItems from "../constants/navItems"

class navUtil {
    static getNavItems = (role) => {
        const finalNavs = [];

        for (let i = 0; i < navItems.length; i++) {
            if (role === navItems[i].role) {
                finalNavs.push(navItems[i])
            }
        }
        return finalNavs
    }
}

export default navUtil