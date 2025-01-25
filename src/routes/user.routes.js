import express from "express";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadImage } from "../controllers/data.controllers.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshToken", refreshToken);
router.post("/upload", upload.single("image"), uploadImage);

export default router;