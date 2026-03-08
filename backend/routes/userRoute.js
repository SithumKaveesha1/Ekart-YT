import express from "express";
import { register,reVerify,verify } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/usAuthenticated.js";


const router = express.Router();

router.post("/register", register)
router.post("/verify", verify)
router.post("/re-verify", reVerify)
router.post("/login", login)
router.post("/logout",isAuthenticated, logout)
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOTP)
router.post("/change-password", changePassword)



export default router;