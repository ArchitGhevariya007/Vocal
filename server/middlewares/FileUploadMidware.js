const multer = require("multer");

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles"); // Specify the directory where the files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

// Create a multer instance with the specified storage
const upload = multer({ storage });

module.exports = upload;
