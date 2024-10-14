import React, { useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetailPage from './Pages/ProductDetailPage';
import NewsPage from './Pages/New'; // Đã chỉnh sửa tên file thành 'News'
import ContactPage from './Pages/Contact';
import CartPage from './Pages/Cart';
import StorePage from './Pages/Store';
import logoImage from './Components/Assets/image/OIP.jpg'; // Đảm bảo đường dẫn và phần mở rộng file chính xác

import './App.css';
import LoginForm from './Components/LoginForm/LoginForm'; // Đảm bảo đường dẫn chính xác
import RegisterForm from './Components/LoginForm/RegisterForm'; // Đảm bảo đường dẫn chính xác

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Navigate to home page with search query
        navigate(`/?search=${event.target.value}`);
    };

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            removeFromCart(productId);
        }
    };

    // Dữ liệu sản phẩm
    const productCategories = {
        'Điện thoại': [
            { id: 1, name: 'Iphone 11', price: 10000000, image: 'https://th.bing.com/th/id/R.83b5441c0524e63976fb99067d60174d?rik=cOVe16oNy%2bU1mA&pid=ImgRaw&r=0/150' },
            { id: 2, name: 'Iphone 11 Pro Max', price: 8000000, image: 'https://via.placeholder.com/150' },
            { id: 3, name: 'Iphone 12', price: 8000000, image: 'https://via.placeholder.com/150' },
            { id: 4, name: 'Iphone 13', price: 8000000, image: 'https://via.placeholder.com/150' },
            { id: 5, name: 'Iphone 14', price: 8000000, image: 'https://via.placeholder.com/150' },
            { id: 6, name: 'Iphone 15', price: 8000000, image: 'https://via.placeholder.com/150' },
        ],
        'Laptop & PC': [
            { id: 7, name: 'Laptop Acer Nitro', price: 20000000, image: 'https://via.placeholder.com/150' },
            { id: 8, name: 'Laptop Dell  ', price: 5000000, image: 'https://via.placeholder.com/150' },
            { id: 9, name: 'Laptop HP ', price: 5000000, image: 'https://via.placeholder.com/150' },
            { id: 10, name: 'Laptop Asus TUF ', price: 5000000, image: 'https://via.placeholder.com/150' },
            { id: 11, name: 'Laptop Legion 5 ', price: 5000000, image: 'https://via.placeholder.com/150' },
            { id: 12, name: 'Macbook M1 ', price: 5000000, image: 'https://via.placeholder.com/150' },
        ],
        'Phụ kiện': [
            { id: 13, name: 'Tai nghe', price: 2000000, image: 'https://via.placeholder.com/150' },
            { id: 14, name: 'Chuột không dây', price: 500000, image: 'https://via.placeholder.com/150' },
            { id: 15, name: 'Bàn phím cơ', price: 1500000, image: 'https://via.placeholder.com/150' },
            { id: 16, name: 'Ổ cứng SSD', price: 2500000, image: 'https://via.placeholder.com/150' },
            { id: 17, name: 'Ổ cứng SSD', price: 2500000, image: 'https://via.placeholder.com/150' },
            { id: 18, name: 'Ổ cứng SSD', price: 2500000, image: 'https://via.placeholder.com/150' },
        ],
    };

    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/store">Cửa hàng</Link>
                    </li>
                    <li>
                        <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li>
                        <Link to="/news">Tin tức</Link>
                    </li>
                    <li>
                        <Link to="/cart">Giỏ hàng</Link>
                    </li>
                    <li className="search-item">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                            style={{ width: '300px', padding: '8px', fontSize: '16px' }} // Thay đổi style inline
                        />
                    </li>
                    <li>
                        <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to="/register">Đăng ký</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home productCategories={productCategories} searchTerm={searchTerm} />} />
                <Route path="/store" element={<StorePage addToCart={addToCart} />} />
                <Route
                    path="/cart"
                    element={<CartPage cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                {/* Đường dẫn tới ProductDetailPage với productId */}
                <Route path="/product/:productId" element={<ProductDetailPage productCategories={productCategories} />} />
            </Routes>
        </div>
    );
}

export default App;
