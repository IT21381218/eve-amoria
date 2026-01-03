
import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Share2, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, StarHalf, Eye, TrendingUp } from 'lucide-react';
import "../styles/product-styles.css"

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro Max",
    price: 45.99,
    originalPrice: 89.99,
    rating: 4.5,
    reviews: 2341,
    sold: 5000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop"
    ],
    description: "Experience premium audio quality with our flagship wireless headphones. Featuring advanced active noise cancellation technology, 30-hour battery life, and studio-grade sound quality. Perfect for music lovers, professionals, and travelers who demand the best.",
    features: [
      "Advanced Active Noise Cancellation (ANC)",
      "30-hour extended battery life",
      "Bluetooth 5.0 with multipoint connection",
      "Premium 40mm drivers for superior sound",
      "Comfortable memory foam ear cushions",
      "Built-in microphone with CVC 8.0",
      "Foldable design with carrying case"
    ],
    badge: "Best Seller",
    trending: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch Pro",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 1823,
    sold: 3200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop"
    ],
    description: "Track your fitness goals with precision using this advanced smartwatch. Features heart rate monitoring, GPS tracking, multiple sport modes, and 7-day battery life.",
    features: [
      "24/7 Heart rate monitoring",
      "Built-in GPS tracking",
      "50m Water resistant",
      "7-day battery life",
      "Multiple sport modes (20+)",
      "Sleep quality tracking",
      "Smart notifications"
    ],
    badge: "Hot",
    trending: true
  },
  {
    id: 3,
    name: "Premium Leather Backpack",
    price: 64.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 892,
    sold: 1500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop"
    ],
    description: "Sophisticated leather backpack crafted from premium full-grain leather. Perfect for professionals and travelers who appreciate quality and style.",
    features: [
      "100% Genuine full-grain leather",
      "Padded laptop compartment (15.6\")",
      "Multiple organized pockets",
      "Reinforced padded straps",
      "Water-resistant treatment",
      "Anti-theft back pocket"
    ],
    badge: "New"
  },
  {
    id: 4,
    name: "4K Action Camera Ultra",
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 3421,
    sold: 8900,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&h=800&fit=crop"
    ],
    description: "Capture your adventures in stunning 4K resolution. Professional-grade action camera with advanced stabilization and waterproof design.",
    features: [
      "4K/60fps video recording",
      "Waterproof up to 30m (without case)",
      "6-axis gyro stabilization",
      "170° ultra-wide angle lens",
      "WiFi & Bluetooth connectivity",
      "Voice control enabled",
      "Complete accessory kit included"
    ],
    badge: "Best Seller",
    trending: true
  },
  {
    id: 5,
    name: "Power Bank 20000mAh Fast Charge",
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviews: 5234,
    sold: 12000,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop"
    ],
    description: "Never run out of power with this high-capacity portable charger. Features fast charging for all your devices with smart protection.",
    features: [
      "20000mAh ultra-high capacity",
      "PD 20W fast charging",
      "Triple USB output ports",
      "LED digital display",
      "Compact aluminum design",
      "Smart protection system"
    ],
    badge: "Hot"
  },
  {
    id: 6,
    name: "RGB Mechanical Gaming Keyboard",
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 1567,
    sold: 4200,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop"
    ],
    description: "Elevate your gaming with this premium mechanical keyboard featuring customizable RGB lighting and ultra-responsive switches.",
    features: [
      "Hot-swappable mechanical switches",
      "Per-key RGB backlighting",
      "Programmable macro keys",
      "Ergonomic wrist rest included",
      "Full N-key rollover",
      "Detachable USB-C cable",
      "Aluminum frame construction"
    ],
    badge: "New",
    trending: true
  }
];

const ProductCard = ({ product, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className="product-card" 
      onClick={() => onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <button className="quick-view-btn">
            <Eye size={18} />
            <span>Quick View</span>
          </button>
        </div>
        {product.badge && (
          <div className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
            {product.badge}
          </div>
        )}
        {product.trending && (
          <div className="trending-badge">
            <TrendingUp size={14} />
            <span>Trending</span>
          </div>
        )}
        <div className="discount-tag">{discount}% OFF</div>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating-row">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => {
              const ratingValue = product.rating - i;
              return (
                <span key={i} className="star-wrapper">
                  {ratingValue >= 1 ? (
                    <Star size={14} fill="#FFA500" stroke="#FFA500" />
                  ) : ratingValue >= 0.5 ? (
                    <StarHalf size={14} fill="#FFA500" stroke="#FFA500" />
                  ) : (
                    <Star size={14} fill="none" stroke="#E5E7EB" />
                  )}
                </span>
              );
            })}
          </div>
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <div className="price-group">
            <span className="price-current">${product.price}</span>
            <span className="price-original">${product.originalPrice}</span>
          </div>
        </div>

        <div className="product-footer">
          <div className="sold-info">
            <ShoppingCart size={14} />
            <span>{product.sold.toLocaleString()} sold</span>
          </div>
          <button className="add-cart-icon" onClick={(e) => {
            e.stopPropagation();
            alert('Added to cart!');
          }}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <div className="modal-left">
            <div className="image-main-container">
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.images.length > 1 && (
                <>
                  <button className="nav-btn nav-prev" onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}>
                    <ChevronLeft />
                  </button>
                  <button className="nav-btn nav-next" onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}>
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
            <div className="image-thumbnails">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`thumbnail-item ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-right">
            <div className="product-header-section">
              <h1 className="product-detail-title">{product.name}</h1>
              
              <div className="detail-rating-section">
                <div className="rating-stars-large">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = product.rating - i;
                    return (
                      <span key={i}>
                        {ratingValue >= 1 ? (
                          <Star size={20} fill="#FFA500" stroke="#FFA500" />
                        ) : ratingValue >= 0.5 ? (
                          <StarHalf size={20} fill="#FFA500" stroke="#FFA500" />
                        ) : (
                          <Star size={20} fill="none" stroke="#E5E7EB" />
                        )}
                      </span>
                    );
                  })}
                </div>
                <span className="detail-rating-value">{product.rating}</span>
                <span className="detail-separator">•</span>
                <span className="detail-reviews-count">{product.reviews.toLocaleString()} Reviews</span>
                <span className="detail-separator">•</span>
                <span className="detail-sold-count">{product.sold.toLocaleString()} Sold</span>
              </div>
            </div>

            <div className="price-section">
              <div className="price-main">
                <span className="price-symbol">$</span>
                <span className="price-amount">{product.price}</span>
              </div>
              <div className="price-comparison">
                <span className="price-was">${product.originalPrice}</span>
                <span className="price-save">Save {discount}%</span>
              </div>
            </div>

            <div className="description-section">
              <h3 className="section-title">Product Description</h3>
              <p className="description-text">{product.description}</p>
            </div>

            <div className="features-section">
              <h3 className="section-title">Key Features</h3>
              <ul className="features-list">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="benefits-section">
              <div className="benefit-item">
                <Truck size={22} />
                <div className="benefit-text">
                  <span className="benefit-title">Free Delivery</span>
                  <span className="benefit-desc">On orders over $50</span>
                </div>
              </div>
              <div className="benefit-item">
                <Shield size={22} />
                <div className="benefit-text">
                  <span className="benefit-title">Secure Payment</span>
                  <span className="benefit-desc">100% protected</span>
                </div>
              </div>
              <div className="benefit-item">
                <RotateCcw size={22} />
                <div className="benefit-text">
                  <span className="benefit-title">Easy Returns</span>
                  <span className="benefit-desc">30-day guarantee</span>
                </div>
              </div>
            </div>

            <div className="actions-section">
              <div className="quantity-control">
                <label>Quantity</label>
                <div className="quantity-buttons">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn-add-cart">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="btn-buy-now">Buy Now</button>
                <button className="btn-share">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductListing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'sports', name: 'Sports & Fitness' }
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.sold - a.sold;
  });

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Luxury Fashion Collection</h1>
          <p className="hero-subtitle">Discover the finest selection of premium products</p>
          <button className="hero-cta">Explore Collection</button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-left">
            <h2 className="section-heading">New Arrivals</h2>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-right">
            <div className="sort-control">
              <label>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select-new">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="results-info">{sortedProducts.length} Products</div>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="products-wrapper">
          <div className={`products-grid ${viewMode}`}>
            {sortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductListing;