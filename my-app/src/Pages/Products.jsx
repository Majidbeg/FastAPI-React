import React, { useEffect, useState } from "react";
import { getProductsAPI } from "../features/products/producst"
import Navbar from "../components/NavBar";

function HeaderPage() {

  const [pageNumber, setPageNumber] = useState(1)
  const [pagesArray, setPagesArray] = useState([])
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([])


  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await getProductsAPI({ Page: pageNumber, limit: 20 });
      setProducts(res.products)  
      // setProducts((prev) => {
      //   // avoid duplicates (important if user clicks same page again)
      //   const newItems = res.products.filter(
      //     (p) => !prev.some((item) => item.id === p.id)
      //   );
      //   return [...prev, ...newItems];
      // });

      let allPages = Array.from({ length: res.total_pages }, (_, i) => i + 1);
      setPagesArray(allPages)
      console.log(res)
      setLoading(false)
    } catch (error) {
      console.log("error fetching data")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // window.scrollTo({ top: 0, behavior: "smooth" });

  }, [pageNumber])

  return (
    <div style={styles.body}>
      <Navbar />
      <h2 style={styles.title}>🛒 Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((item) => {
            const finalPrice = (
              item.price - (item.price * item.discount) / 100
            ).toFixed(2);

            return (
              <div key={item.id} style={styles.card}>
                {/* Image Placeholder */}
                <div style={styles.image}>📦</div>

                {/* Brand + Category */}
                <div style={styles.meta}>
                  <span>{item.category}</span>
                  <span>{item.brand}</span>
                </div>

                {/* Name */}
                <h3 style={styles.name}>{item.name}</h3>

                {/* Rating */}
                <p style={styles.rating}>⭐ {item.rating}</p>

                {/* Price */}
                <div style={styles.priceBox}>
                  <span style={styles.finalPrice}>₹{finalPrice}</span>
                  <span style={styles.oldPrice}>₹{item.price}</span>
                  <span style={styles.discount}>-{item.discount}%</span>
                </div>

                {/* Stock */}
                <p
                  style={{
                    color: item.in_stock ? "green" : "red",
                    fontSize: "12px",
                  }}
                >
                  {item.in_stock ? "In Stock" : "Out of Stock"}
                </p>

                {/* Tags */}
                <div style={styles.tags}>
                  {item.tags.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button style={styles.button}>Add to Cart</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div style={styles.pagination}>
        {pagesArray.map((num) => (
          <button
            key={num}
            onClick={() => setPageNumber(num)}
            style={{
              ...styles.pageBtn,
              background: pageNumber === num ? "#000" : "#eee",
              color: pageNumber === num ? "#fff" : "#000",
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeaderPage;

const styles = {
  title: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer",
  },

  image: {
    height: "150px",
    background: "#f3f3f3",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    marginBottom: "10px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#777",
  },

  name: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "5px 0",
  },

  rating: {
    fontSize: "14px",
    color: "#f5a623",
  },

  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "8px 0",
  },

  finalPrice: {
    fontSize: "16px",
    fontWeight: "bold",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: "13px",
  },

  discount: {
    color: "green",
    fontSize: "12px",
  },

  tags: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    margin: "5px 0",
  },

  tag: {
    background: "#eee",
    padding: "2px 6px",
    borderRadius: "6px",
    fontSize: "10px",
  },

  button: {
    width: "100%",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },

pagination: {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
  overflowX: "auto",
  whiteSpace: "nowrap",
  scrollSnapType: "x mandatory",
},

pageBtn: {
  padding: "8px 12px",
  borderRadius: "6px",
  flex: "0 0 auto",
  scrollSnapAlign: "center",
},
};