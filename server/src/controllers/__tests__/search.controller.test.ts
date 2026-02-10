import request from "supertest";
import express from "express";
import productRoutes from "../../routes/product.route";

const app = express();
app.use(express.json());
app.use("/product", productRoutes);

describe("Product Search", () => {
  it("should return products for a valid search query", async () => {
    const response = await request(app)
      .get("/product/products/search?q=test&page=1&limit=10&sort=newest")
      .expect(200);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("pagination");
    expect(Array.isArray(response.body.data.data)).toBe(true);
    expect(response.body.data.pagination).toHaveProperty("page");
    expect(response.body.data.pagination).toHaveProperty("limit");
    expect(response.body.data.pagination).toHaveProperty("totalPages");
    expect(response.body.data.pagination).toHaveProperty("totalItems");
  });

  it("should handle empty search query", async () => {
    const response = await request(app)
      .get("/product/products/search")
      .expect(200);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
  });

  it("should validate pagination parameters", async () => {
    const response = await request(app)
      .get("/product/products/search?page=invalid&limit=100")
      .expect(400);

    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message");
  });

  it("should handle different sort options", async () => {
    const sorts = ["newest", "price_asc", "price_desc"];
    
    for (const sort of sorts) {
      const response = await request(app)
        .get(`/product/products/search?sort=${sort}`)
        .expect(200);
      
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
    }
  });
});
