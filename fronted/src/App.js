import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import ChatBox from "./components/CheckBox";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";
import { sign_out } from "./redux/actions/userAction";
import CartScreen from "./screens/CartScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignInScreen from "./screens/SignInScreen";
import SupportScreen from "./screens/SupportScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(sign_out());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Rose Store
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#sign_out" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Fragment>
                <Link to="/signin">Sign In</Link>
              </Fragment>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route
              path="/profile"
              element={<PrivateRoute Component={ProfileScreen} />}
            />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route
              path="/productlist"
              element={<AdminRoute Component={ProductListScreen} />}
            />
            <Route
              path="/support"
              element={<AdminRoute Component={SupportScreen} />}
            />
            <Route
              path="/dashboard"
              element={<AdminRoute Component={DashboardScreen} />}
            />
            <Route
              path="/orderlist"
              element={<AdminRoute Component={OrderListScreen} />}
            />
            <Route
              path="/userlist"
              element={<AdminRoute Component={UserListScreen} />}
            />
            <Route
              path="/user/:id/edit"
              element={<AdminRoute Component={UserEditScreen} />}
            />
            <Route
              path="/productlist/seller"
              element={<SellerRoute Component={ProductListScreen} />}
            />
            <Route
              path="/orderlist/seller"
              element={<SellerRoute Component={OrderListScreen} />}
            />
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{" "}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
