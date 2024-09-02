import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRoute.js";
import orderRouter from "./routers/orderRouters.js";
import uploadRouter from "./routers/uploadRouters.js";

// DOTENV
dotenv.config();
// MONGOOSE DB CONNECTED
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
// CORS API ERROR
app.use(cors());
// JSON FORMATE DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads", uploadRouter);
// USERS API
app.use("/api/users", userRouter);
// PRODUCTS API
app.use("/api/products", productRouter);
// ORDER API
app.use("/api/orders", orderRouter);
// PAYPAL API
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/uploads", express.static("uploads"));
// SERVER READY ROUTE
app.get("/", (req, res) => {
  res.send("server is ready");
});

// ERROR MESSAGE
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// PORT LOCALHOST
const PORT = process.env.PORT || 9000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log("Online", user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});

// app.listen(5000, () => {
//   console.log(`server at http://localhost:${PORT}`);
// });
