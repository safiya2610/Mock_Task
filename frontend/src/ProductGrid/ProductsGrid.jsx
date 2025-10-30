import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductsGrid.css"; // optional custom styles

const products = [
  {
    id: 1,
    category: "Accessories",
    title: "Herschel backpack in dark blue",
    price: 56.99,
    img: "https://image.made-in-china.com/318f0j00UtKRfipITlbu/-4000178632235-mp4.webp",
    badge: { text: "New arrival", type: "success" },
    rating: 0,
    stars: 0,
  },
  {
    id: 2,
    category: "Clothing",
    title: "Front hoodie",
    price: 91.88,
    img: "https://www.aybl.com/cdn/shop/files/07_01_25_MensEcom0847.jpg?v=1737380718&width=2048",
     
    rating: 40,
    stars: 4,
  },
  {
    id: 3,
    category: "Accessories",
    title: "Herschel backpack in gray",
    price: 29.99,
    oldPrice: 33.99,
    img: "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/j/15/6d52dbd2-2b07-4fd4-bc70-6eb1c1dc65ff.jpg",
    badge: { text: "Sold out", type: "danger" },
    rating: 125,
    stars: 3,
  },
  {
    id: 4,
    category: "Clothing",
    title: "Front Originals adicolor t-shirt with trefoil logo",
    price: 38.0,
    img: "https://m.media-amazon.com/images/I/61x+wRq2e5L._AC_UY1100_.jpg",
    rating: 9,
    stars: 5,
  },
];

const ProductsGrid = () => {
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <small
          key={i}
          className={`fa-star ${i < count ? "fas text-warning" : "far text-muted"}`}
        ></small>
      );
    }
    return stars;
  };

  return (
    <div className="row mx-n2 mx-sm-n3">
      {products.map((product) => (
        <div
          className="col-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
          key={product.id}
        >
          <div className="card text-center h-100">
            <div className="position-relative">
              <img
                className="card-img-top"
                src={product.img}
                alt={product.title}
              />

              {product.badge && (
                <div className="position-absolute top-0 left-0 pt-3 pl-3">
                  <span
                    className={`badge badge-${product.badge.type} badge-pill`}
                  >
                    {product.badge.text}
                  </span>
                </div>
              )}

              <div className="position-absolute top-0 right-0 pt-3 pr-3">
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-outline-secondary rounded-circle"
                  title="Save for later"
                >
                  <span className="fas fa-heart btn-icon__inner"></span>
                </button>
              </div>
            </div>

            <div className="card-body pt-4 px-4 pb-0">
              <div className="mb-2">
                <a
                  className="d-inline-block text-secondary small font-weight-medium mb-1"
                  href="#"
                >
                  {product.category}
                </a>
                <h4 className="font-size-1 font-weight-normal">
                  <a className="text-secondary" href="#">
                    {product.title}
                  </a>
                </h4>
                <div className="d-block font-size-1">
                  <span className="font-weight-medium">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-secondary ml-1">
                      <del>${product.oldPrice.toFixed(2)}</del>
                    </span>
                  )}
                </div>
              </div>
            </div>

           
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
