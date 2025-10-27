const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authenticationAndAuthorization.middleware")
const { authorizeUserOrCaptain } = require("../controllers/authorization.controllers")

router.get("/", authenticateUser, authorizeUserOrCaptain)