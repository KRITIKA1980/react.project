import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.category === 'groceries' || data.category.includes('food')) {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Food item not found</h2>
      <Link 
        to="/products" 
        className="inline-block px-6 py-2 rounded-md font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors"
      >
        Browse Food Items
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="ml-1 text-sm font-medium text-gray-600 hover:text-orange-600 md:ml-2">
                Food Items
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-50 rounded-lg flex items-center justify-center p-8 border border-gray-200">
              <img 
                src={product.images?.[selectedImage] || product.thumbnail} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
              />
              {product.discountPercentage && (
                <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-sm font-bold bg-orange-600 text-white">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.images?.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-orange-600 scale-105' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {'★'.repeat(Math.round(product.rating))}
                  {'☆'.repeat(5 - Math.round(product.rating))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} • {product.stock} in stock
                </span>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold text-orange-600 mb-1">
                  ${product.price}
                  {product.discountPercentage && (
                    <span className="text-lg ml-2 line-through text-gray-600">
                      ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
                    </span>
                  )}
                </p>
                <p className="text-green-600 text-sm font-medium">Free delivery available</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this item</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6 border-t border-b border-gray-200 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                className="w-full px-6 py-3 rounded-lg font-medium bg-orange-600 hover:bg-orange-700 transition-colors text-white flex items-center justify-center"
                onClick={() => addToCart({...product, quantity: 1})}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button
                className="w-full px-6 py-3 rounded-lg font-medium border border-orange-600 hover:bg-orange-50 transition-colors text-orange-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="border-t border-gray-200 px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-1 text-gray-500">Be the first to review this product</p>
            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700">
              Write a review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;