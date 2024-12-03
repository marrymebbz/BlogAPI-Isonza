// //[Dependencies and Modules]
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// //[Routes]
// //allows access to routes defined within our app
// const blogRoutes = require("./routes/blog");
// const userRoutes = require("./routes/user");

// //[Environment Setup]
// //const port = 4000;
// //loads variables from env files
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// //[Database Connection]
// //Connect to our MongoDB
// mongoose.connect("mongodb+srv://admin:admin123@wdc028-b461.encgn.mongodb.net/Blog-App-API?retryWrites=true&w=majority&appName=WDC028-B461");
// //prompts a message once the connection is 'open' and we are connected successfully to the db
// mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

// // app.use(express.json());
// // app.use(express.urlencoded({extended:true}));   
// app.use("/blogs", blogRoutes);
// app.use("/users", userRoutes);

// //process.env.PORT || 3000 will use the env if it is available OR use port 3000 if no env is defined
// if(require.main === module){
//     app.listen( 4000 || 3000, () => {
//         console.log(`API is now online on port 4000 || 3000 }`)
//     });
// }

// // In creating APIs, exporting modules in the "index.js" file is ommited
// // exports an object containing the value of the "app" variable only used for grading.
// module.exports = { app, mongoose };

//[Dependencies and Modules]
//[Dependencies and Modules]
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const jwt = require("jsonwebtoken"); // Add JWT for token handling
// const dotenv = require("dotenv");

// const PORT=4000
// const MONGODB_STRING="mongodb+srv://admin:admin123@wdc028-b461.encgn.mongodb.net/Blog-App-API?retryWrites=true&w=majority&appName=WDC028-B461"
// const JWT_SECRET_KEY="BlogAppAPI"

// // Load environment variables
// dotenv.config();

// //[Routes]
// // Allows access to routes defined within our app
// const blogRoutes = require("./routes/blog");
// const userRoutes = require("./routes/user");

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //[Environment Setup]
// const port = PORT || 3000;
// const jwtSecretKey = process.env.JWT_SECRET_KEY || "BlogAppAPI"; // Load JWT secret key

// //[Database Connection]
// // Connect to our MongoDB
// mongoose.connect(MONGODB_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// mongoose.connection.once("open", () =>
//     console.log("Now connected to MongoDB Atlas")
// );

// // JWT Middleware for protected routes
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
//     if (!token) return res.status(401).json({ message: "No token provided." });

//     jwt.verify(token, jwtSecretKey, (err, decoded) => {
//         if (err) return res.status(403).json({ message: "Invalid or expired token." });
//         req.user = decoded; // Attach decoded token data to request object
//         next();
//     });
// };

// // Protected Route Example (using middleware)
// app.get("/protected", verifyToken, (req, res) => {
//     res.status(200).send({ message: "Access granted.", user: req.user });
// });

// //[Route Integration]
// app.use("/blogs", blogRoutes);
// app.use("/users", userRoutes);

// // Start Server
// if (require.main === module) {
//     app.listen(port, () => {
//         console.log(`API is now online on port ${port}`);
//     });
// }

// // Export for testing or grading purposes
// module.exports = { app, mongoose };

// [Dependencies and Modules]
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Constants (hardcoded)
const PORT = 4000;
const MONGODB_STRING = "mongodb+srv://admin:admin123@wdc028-b461.encgn.mongodb.net/Blog-App-API?retryWrites=true&w=majority&appName=WDC028-B461";
const JWT_SECRET_KEY = "BlogAppAPI";

// [Routes]
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// [Database Connection]
// Connect to MongoDB
mongoose.connect(MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () =>
    console.log("Now connected to MongoDB Atlas")
);

// JWT Middleware for protected routes
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ auth: "Failed", message: "No token provided." });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ auth: "Failed", message: "Invalid or expired token." });
        }
        req.user = decoded; // Attach decoded token data to request object
        next();
    });
};

// Protected Route Example
app.get("/protected", verifyToken, (req, res) => {
    res.status(200).send({ message: "Access granted.", user: req.user });
});

// [Route Integration]
app.use("/posts", blogRoutes);
app.use("/users", userRoutes);

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`API is now online on port ${PORT}`);
    });
}

// Export for testing or grading purposes
module.exports = { app, mongoose };
