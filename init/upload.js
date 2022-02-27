const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const multer = require('multer');
// Multer upload configuration
const upload = multer({
  limits: {
    fileSize: 1000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(json)$/)) {
      return cb(new Error('some custom error message'));
    }
    cb(undefined, true);
  }
});
