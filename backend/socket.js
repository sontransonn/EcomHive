import { Server } from 'socket.io';

let allCustomer = [];
let allSeller = [];
let admin = {};

const addUser = (customerId, socketId, userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({ customerId, socketId, userInfo })
    }
}

const addSeller = (sellerId, socketId, userInfo) => {
    const checkSeller = allSeller.some(u => u.sellerId === sellerId);
    if (!checkSeller) {
        allSeller.push({ sellerId, socketId, userInfo });
    }
};

const findCustomer = customerId => {
    return allCustomer.find(c => c.customerId === customerId)
};

const findSeller = sellerId => {
    return allSeller.find(c => c.sellerId === sellerId);
}

const remove = socketId => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId);
    allSeller = allSeller.filter(c => c.socketId !== socketId);
};

const removeAdmin = socketId => {
    if (admin.socketId === socketId) {
        admin = {};
    }
};

const initSocket = server => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            credentials: true
        }
    });

    io.on('connection', soc => {
        console.log('Socket server is connected...');

        // Thêm customer vào allCustomer
        soc.on('add_user', (customerId, userInfo) => {
            addUser(customerId, soc.id, userInfo);
            io.emit('activeSeller', allSeller);
            io.emit('activeCustomer', allCustomer);
        });

        // Thêm seller vào allSeller
        soc.on('add_seller', (sellerId, userInfo) => {
            addSeller(sellerId, soc.id, userInfo);
            io.emit('activeSeller', allSeller);
            io.emit('activeCustomer', allCustomer);
            io.emit('activeAdmin', { status: true });
        });

        soc.on('add_admin', adminInfo => {
            delete adminInfo.email;
            admin = adminInfo;
            admin.socketId = soc.id;
            io.emit('activeSeller', allSeller);
            io.emit('activeAdmin', { status: true });
        });

        soc.on('send_seller_message', msg => {
            const customer = findCustomer(msg.receverId);
            if (customer !== undefined) {
                soc.to(customer.socketId).emit('seller_message', msg);
            }
        });

        soc.on('send_customer_message', msg => {
            const seller = findSeller(msg.receverId);
            if (seller !== undefined) {
                soc.to(seller.socketId).emit('customer_message', msg);
            }
        });

        soc.on('send_message_admin_to_seller', msg => {
            const seller = findSeller(msg.receverId);
            if (seller !== undefined) {
                soc.to(seller.socketId).emit('receved_admin_message', msg);
            }
        });

        soc.on('send_message_seller_to_admin', msg => {
            if (admin.socketId) {
                soc.to(admin.socketId).emit('receved_seller_message', msg);
            }
        });

        soc.on('disconnect', () => {
            console.log('User disconnected');
            remove(soc.id);
            removeAdmin(soc.id);
            io.emit('activeAdmin', { status: false });
            io.emit('activeSeller', allSeller);
            io.emit('activeCustomer', allCustomer);
        });
    });
}

export default initSocket