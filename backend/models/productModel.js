import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
