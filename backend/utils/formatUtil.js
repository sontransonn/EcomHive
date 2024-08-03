class formatUtil {
    // Định dạng lại mảng products thành các nhóm, mỗi nhóm 3 product
    static formateProduct = (products) => {
        const productArray = [];
        let i = 0;
        while (i < products.length) {
            let temp = []
            let j = i
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j])
                }
                j++
            }
            productArray.push([...temp])
            i = j
        }

        return productArray
    }
}

export default formatUtil