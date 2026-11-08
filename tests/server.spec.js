const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("GET /cafes devuelve 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0]).toBeInstanceOf(Object);
    });

    it("DELETE /cafes/:id devuelve 404 si el id no existe", async () => {
        const jwt = "token";
        const idInexistente = 999;
        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", jwt)
            .send();
        expect(response.statusCode).toBe(404);
    });

    it("POST /cafes agrega un nuevo cafe y devuelve 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Latte" };
        const response = await request(server).post("/cafes").send(cafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(cafe);
    });

    it("PUT /cafes/:id devuelve 400 si el id del parametro es distinto al del payload", async () => {
        const cafe = { id: 2, nombre: "Espresso" };
        const response = await request(server).put("/cafes/1").send(cafe);
        expect(response.statusCode).toBe(400);
    });

});
