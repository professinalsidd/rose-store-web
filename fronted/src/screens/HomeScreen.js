import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div className="row center">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        products.map((product) => (
          <Product product={product} key={product._id} />
        ))
      )}
    </div>
  );
}
