const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles"); // Specify the directory where the files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

// Create a multer instance with the specified storage
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("File must be jpeg or png"), false); // Reject the file
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size should be less than 5MB!",
        app_status: false,
      });
    }else if (err.message === "File must be jpeg or png") {
      return res.status(400).json({
        message: "File must be jpeg or png",
        app_status: false,  
      });
    }
  }
  next(err);
};


module.exports = {upload,errorHandler};
