import ProductCard from "./ProductCard";

function FlashSale({ products }) {
  return (
    <div style={{ padding: "40px 20px" }}>
      <h2>🔥 Flash Sale</h2>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FlashSale;