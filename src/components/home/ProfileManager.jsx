import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../feature/orderSlice';
import { clearCart } from '../../feature/cartSlice';
import '../../App.css';

const ProfileManager = () => {
  // State to manage user profile data

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  /* const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); */

  useEffect(()=>{
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    console.log(storedProfile);
    
    if(storedProfile){
      setProfile(storedProfile)
    }

    const storedCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (storedCart) {
      setCartData(storedCart);
    }

    // Retrieve orders from localStorage (if available)
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);

  },[]);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log('Profile updated:', profile); */
    localStorage.setItem('userProfile',JSON.stringify(profile));
    setIsEditing(false);
    // Here you would typically make an API call to save the updated profile
  };

  const logout = (e) =>{
    alert('Logging out');
    localStorage.removeItem("userProfile");
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("orders");
    dispatch(clearCart);
    navigate("/");
    /* window.location.reload(); */
  }

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      const newOrder = {
        orderId: Date.now(), // Generate a unique order ID based on timestamp
        items: cart, // Store the cart items as part of the order
        date: new Date().toLocaleString(), // Save the order date
      };

      // Dispatch the action to save the order in the store
      dispatch(placeOrder(newOrder));

      // Optionally, clear the cart after placing the order
      dispatch(clearCart());

      // Update the localStorage with the new orders
      const updatedOrders = [...orders, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);

      // Redirect or show confirmation message
      alert('Your order has been placed!');
    } else {
      alert('Your cart is empty!');
    }
  };

  // Handle action selection from dropdown
  const handleActionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAction(selectedValue);

    switch (selectedValue) {
      case 'edit':
        setIsEditing(true);
        break;
      case 'orders':
        break; // No action needed here, orders will be displayed below
      case 'logout':
        logout();
        break;
      default:
        setIsEditing(false); // Reset to default state if no valid action
        break;
    }
  };

  return (
    <div className="profilePage">
      <h2>Profile</h2>
      
      {/* Dropdown Menu */}
      <div /* style={{ marginBottom: '20px' }} */>
        <select
          onChange={handleActionChange} value={selectedAction}
        >
          <option value="">Select an action</option>
          <option value="edit">Edit Profile</option>
          <option value="orders">Your Orders</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {/* Profile Form or Profile Details */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className='flex-container'>
          <div className='flex-item'>
            <div className='flex-smallColumn'>
              <label>Name:</label></div>
              <div className='flex-bigColumn'><input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='flex-item'>
            <div className='flex-smallColumn'>
              <label>Email:</label></div>
              <div className='flex-bigColumn'>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='flex-item'>
            <div className='flex-smallColumn'>
              <label>Phone Number:</label></div>
              <div className='flex-bigColumn'><textarea
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex-item-b'>
              <div className='flex-item-button'>
                <button type="submit">Save</button>
              </div>
              <div className='flex-item-button'>
                  <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
              </button>
              </div>
          </div>  
        </form>
      ) : (
        <div className='flex-item-edit'>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {profile.phone}
          </p>
          {/* <button onClick={() => setIsEditing(true)}>Edit Profile</button> */}
        </div>
      )}
      {/* Orders Section */}
      {selectedAction === 'orders' && (
        <div>
          <h3>Your Orders</h3>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.orderId}>
                  <p>Order ID: {order.orderId}</p>
                  <p>Date: {order.date}</p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        <p>{item.title} - ${item.price}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      )}

      {/* Cart to Orders button */}
      {cart.length > 0 && !isEditing && selectedAction !== 'orders' && (
        <button onClick={handlePlaceOrder}>Place Order</button>
      )}
    </div>
    
  );
};

export default ProfileManager;