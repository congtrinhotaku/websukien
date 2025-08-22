const express = require("express")
const app = express()
const env = require("dotenv").config()
const path = require("path")
const session = require("express-session")
const methodOverride = require("method-override")
const db = require("./config/db")
const morgan = require("morgan")
const isUser = require("./middlewares/userAuth")

// Router
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

// Kết nối DB
db()

// Middleware
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000
  }
}))

// Ngăn cache
app.use((req, res, next) => {
  res.set("cache-control", "no-store")
  next()
})

// View engine
app.set("view engine", "ejs")
app.set("views", [
  path.join(__dirname, "views"),
])

// Static files
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/", indexRouter)
app.use("/users",isUser, usersRouter)

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const errorMessage = err.message || "Internal Server Error"
  res.status(statusCode).render("errorPage", { statusCode, errorMessage })
})

// 404 page
app.use((req, res) => {
  res.send("404 Not Found");
})

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`)
})

module.exports = app
