const db = require('./db');
const mail = require('./mail');

//Testing numbers
module.exports.absolute = function(number) {
    return (number >= 0) ? number: -number;
}

//Testing Strings
module.exports.greet = function(name) {
    return 'Welcome ' + name;
}

//Testing Arrays
module.exports.getCurrencies = function(){
    return ['USD' , 'INR' ,'EURO' ,'AUD'];
}

//Testing Objects
module.exports.getProduct = function(productId){
    return { id : productId, price : 10 };
}

//Testing Exceptions
module.exports.registerUser = function(username){
    if(!username) throw new Error('username is required');
    return { id : new Date().getTime, username: username }
}

//Mock Function
module.exports.applyDiscounts = function(order){
    const customer = db.getCustomerSync(order.customerId);
    if(customer.points > 10)
    order.totalPrice *= 0.9;
}
//Other Mock Function
module.exports.notifyCustomer = function(order){
    const customer = db.getCustomerSync(order.customerId);
    mail.send(customer.email, 'Your order placed successfully..');
}