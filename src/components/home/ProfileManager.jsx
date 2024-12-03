import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* import { placeOrder } from '../../feature/orderSlice'; */
import { clearCart } from '../../feature/cartSlice';
import LoginDialog from '../login/LoginDialog';
import '../../App.css';
import { setAddressDetails } from '../../feature/userSlice';

const ProfileManager = () => {
  // State to manage user profile data

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
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
  const [captureAddress, setCaptureAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [text, setText] = useState(address || '');
  
  const userAddress = () =>{
    sessionStorage.setItem("address", text);
    dispatch(setAddressDetails(text));  // Dispatch the address to Redux
    setCaptureAddress(false);  // Close the address form
  }
  const handleEdit = () => {
    setIsEditingAddress(true); // Enable editing mode
  };

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

    const storedAddress = sessionStorage.getItem('address');
    if (storedAddress) {
      setText(storedAddress); // Set the address from sessionStorage when the component loads
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
    sessionStorage.removeItem("address");
    dispatch(clearCart());
    navigate("/");
  }

  // Handle action selection from dropdown
  const handleActionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAction(selectedValue);
    console.log("Selected Action:", selectedValue);
    
    switch (selectedValue) {
      case 'edit':
        setIsEditing(true);
        setCaptureAddress(false);
        break;
      case 'orders':
        setIsEditing(false);
        setCaptureAddress(false);
        break;
      case 'address':
        setCaptureAddress(true);
        setIsEditing(false);
        setIsEditingAddress(false);
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
      <div className='profile_heading'><h2 className='h2'>Profile:</h2>{isLoggedIn ? <h3>{ userProfile.name}</h3> : ""}</div>
      
      {/* Dropdown Menu */}
     <div className='select_div'>
        <select onChange={handleActionChange} value={selectedAction} className='select_tag'>
          <option defaultValue="">Select an action</option>
          <option value="edit">Edit Profile</option>
          <option value="orders">Your Orders</option>
          <option value="address">Your Address</option>
          <option value="logout">Logout</option>
        </select>
      </div>
    
      {/* Profile Form or Profile Details */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className='flex-container'>
          <div className='flex-item'>
            <div className='flex-smallColumn'>
              <label className='label-'>Name:</label></div>
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
          <div className='flex-item-edit-div'>
            <p>
            <strong>Name:</strong> {profile.name}
          </p>
          </div>
          
          <div className='flex-item-edit-div'>
            <p>
            <strong>Email:</strong> {profile.email}
          </p>
          </div>
          
          <div className='flex-item-edit-div'>
            <p>
            <strong>Phone Number:</strong> {profile.phone}
          </p>
          </div>
          
          {/* <button onClick={() => setIsEditing(true)}>Edit Profile</button> */}
        </div>
      )}
      {/* Orders Section */}
      {selectedAction === 'orders' && (
        <div className='orders_div'>
          <div>
          <h3 className='orders_h3'>Your Orders</h3>
          {ordersFromLocalStorage && ordersFromLocalStorage.length > 0 ? (
            <table className='orders_table'>
              <tr>
                <th className='table_heading'>ORDER ID</th><th className='table_heading'>ORDER DATE</th>
                <tr>
                <th className='table_heading-item'>ITEM NAME</th><th className='table_heading-price'>PRICE</th> </tr>
              </tr>
              {ordersFromLocalStorage.map((order) => (
                <tr key={order.orderId} className='table_row'>
                  <td className='table_data'>{order.orderId}</td>
                  <td className='table_data'>{order.date}</td>
                  
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, index) => ( 
                          <tr key={index}>
                            <td className='table_data_2'>{item.title}</td><td className='table_data_3'> ₹ {Math.round(30 * item.price - 50)}</td>
                          </tr>
                        ))
                      ) : (
                        <p>No items in this order</p>
                      )}
                    
                  </tr>
                ))}
                    
            </table>
          ) : (
            <p>No orders yet.</p>
          )}
          </div>
        </div>
      )}
      {
        captureAddress && <div className='address-div'>
          <label>Address</label>
          <textarea
                name="address"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Enter Address'
                disabled={!isEditingAddress}
              />
              <div className='address-buttons'>
                {isEditingAddress ? (
                <button type="submit" onClick={userAddress}>Save</button> ) : (
                <button type='button' onClick={handleEdit}>Edit</button>
                )}
                <button type='button' onClick={() => setCaptureAddress(false)}
                  style={{ marginLeft: '10px' }}>Cancel</button>
              </div>
              
        </div>
      }
    </div>
    </div>
  );
};

export default ProfileManager;