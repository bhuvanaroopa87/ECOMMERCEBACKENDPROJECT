const request =require('supertest');
const {Product} = require('../../models/products');

let server;
describe("/api/products", () =>{
    beforeEach(() => {server = require("../../index");});
    afterEach(async () => {
        server.close();
        await Product.remove({});
    });
  
    describe("GET /", () =>{
       it("should return all products" , async () =>{
           await Product.collection.insertMany([
               {name: "product1" ,category:"Men"},
               {name: "product2" ,category:"Women"}
           ]);
       const response = await  request(server).get("/api/products");
       expect(response.status).toBe(200);
       expect(response.body.length).toBe(2);
       });
   });
});