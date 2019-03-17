const lib = require('./lib');
const db = require('./db');
const mail = require('./mail');
describe("absolute" ,() =>{
  it("should return positive if input is positive" ,() =>{
    const result = lib.absolute(1);
    expect(result).toBe(1);
    });

  it("should return positive if input is negative" ,() =>{
    const result = lib.absolute(-1);
    expect(result).toBe(1);
    });

  it(" should return 0 if input is 0" ,() =>{
    const result = lib.absolute(0);
    expect(result).toBe(0);
});
});

describe("greet" ,() =>{
     it("Should return a greet String with a given name", ()=> {
         const result = lib.greet("Roopa");
         expect(result).toBe("Welcome Roopa");
         expect(result).toEqual("Welcome Roopa");
         expect(result).toMatch("Roopa");
         expect(result).toContain("Roopa")
     });
});
describe("currencies" ,   () =>{
  const result = lib.getCurrencies();
  expect(result).not.toBeNull();
  expect(result[3]).toBe("AUD");
  //proper way
  expect(result).toContain("EURO");
  //Ideal way
  expect(result).toEqual(expect.arrayContaining(["INR","EURO"]));
});

describe("Products" ,() =>{
   it("Should return the product with given id" , () =>{
    const result = lib.getProduct(1);
    expect(result).toEqual({ id:1, price:10});
    expect(result).toMatchObject({ id:1, price:10});
   });
});

describe("registerUser" ,() =>{
it("Should throw Error when Username is falsy" ,()=>{
  const falsyError = [null,undefined ,NaN,'', 0,false];
  falsyError.forEach(a =>{
    expect(() =>{lib.registerUser(a)}).toThrow();
  });
});
it("Should return user object with the given username", ()=>{
  const result = lib.registerUser("Roopa");
  expect(result).toMatchObject({username :"Roopa"});
});
});
//Mock Functions
describe("applyDiscount" , () =>{
  it("Should apply 10% if customer has more than 10 points" , ()=>{
   db.getCustomerSync = function(customerId){
     console.log('Mock Function to get customer from mongoDB...');
     return { id: customerId, points :12};
   }
   const order = {customerId:1 ,totalPrice: 10};
   lib.applyDiscounts(order);
   expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer" ,() =>{
  it("Should send mail to the customer " , ()=>{
   db.getCustomerSync = function(customerId){
    console.log('Mock Function to get customer from mongoDB...');
    return { id: customerId, points :12};
   }
   let mailSend = false;
   mail.send =function(email, message){
     console.log("fake mail send called");
     mailSend = true;
   }
   lib.notifyCustomer({customerId: 1});
   expect(mailSend).toBe(true);
  });
});