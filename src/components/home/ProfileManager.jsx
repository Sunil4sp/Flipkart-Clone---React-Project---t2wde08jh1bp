import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* import { placeOrder } from '../../feature/orderSlice'; */
import { clearCart } from '../../feature/cartSlice';
import LoginDialog from '../login/LoginDialog';
import '../../App.css';

const ProfileManager = () => {
  // State to manage user profile data

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    /* address: '' */
  });
  
  const address = useSelector((state) => state.user.address);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isEditing, setIsEditing] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [ordersFromLocalStorage, setOrdersFromLocalStorage] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      setOpenLoginDialog(true); // Open the login dialog if not logged in
    }
  }, [isLoggedIn]);

  useEffect(()=>{
    const storedProfile = JSON.parse(sessionStorage.getItem('userProfile'));
    if(storedProfile){
      setProfile(storedProfile)
    }

    const storedCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (storedCart) {
      setCartData(storedCart);
      dispatch(clearCart()); 
    }

    // Retrieve orders from sessionStorage (if available)
    const storedOrders = JSON.parse(sessionStorage.getItem('orders')) || [];
    console.log('Stored Orders:', storedOrders);
      setOrdersFromLocalStorage(storedOrders);
  },[dispatch]);


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
    sessionStorage.setItem('userProfile',JSON.stringify(profile));
    setIsEditing(false);
  };

  const logout = (e) =>{
    alert('Logging out');
    sessionStorage.removeItem("userProfile");
    sessionStorage.removeItem("shoppingCart");
    sessionStorage.removeItem("orders");
    sessionStorage.removeItem("isLoggedIn");
    dispatch(clearCart());
    navigate("/");
  }

  /* const handlePlaceOrder = () => {
    if (cart.length > 0) {
      const newOrder = {
        orderId: Date.now(), // Generate a unique order ID based on timestamp
        items: cart, // Store the cart items as part of the order
        date: new Date().toLocaleString(), // Save the order date
      };

      // Dispatch the action to save the order in the store
      dispatch(placeOrder(newOrder));
      dispatch(clearCart());
      
      // Update the sessionStorage with the new orders
      const updatedOrders = [...orders, newOrder];
      sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrdersFromLocalStorage(updatedOrders);
      console.log(updatedOrders);
      

      // Redirect or show confirmation message
      alert('Your order has been placed!');
    } else {
      alert('Your cart is empty!');
    }
  }; */

  // Handle action selection from dropdown
  const handleActionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAction(selectedValue);
    console.log("Selected Action:", selectedValue);
    
    switch (selectedValue) {
      case 'edit':
        setIsEditing(true);
        break;
      case 'orders':
        setIsEditing(false);
        break; 
      case 'logout':
        logout();
        break;
      default:
        setIsEditing(false);
        break;
    }
  };
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  return (
    <div className='profile_container'>
    {!isLoggedIn && <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />}
    <div className="profilePage">
      <div className='profile_heading'><h2>Profile:</h2><h3>{userProfile.name}</h3></div>
      
      {/* Dropdown Menu */}
     <div>
        <select onChange={handleActionChange} value={selectedAction}>
          <option defaultValue="">Select an action</option>
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
          {ordersFromLocalStorage && ordersFromLocalStorage.length > 0 ? (
            <ul>
              {ordersFromLocalStorage.map((order) => (
                <li key={order.orderId}>
                  <p>Order ID: {order.orderId}</p>
                  <p>Order Date: {order.date}</p>
                  {console.log('Order Items:', order.items)}
                  {console.log(ordersFromLocalStorage)
                  }
                  <ul>
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <li key={index}>
                            <p>{item.title} - ₹ {Math.round(30 * item.price - 50)}</p>
                          </li>
                        ))
                      ) : (
                        <p>No items in this order</p>
                      )}
                    </ul>
                  </li>
                ))}
                    {/* {order.items.map((item, index) => (
                      <li key={index}>
                        <p>{item.title} - ₹ {Math.round(30 * item.price-50)}</p>
                      </li>
                    ))} 
                  </ul>
                </li>
              ))}*/}
            </ul>
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      )}

      {/* Cart to Orders button */}
     {/*  {cart.length > 0 && !isEditing && selectedAction === 'orders' && (
        <button onClick={handlePlaceOrder}>Place Order</button>
      )} */}
    </div>
    </div>
  );
};

export default ProfileManager;