import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addData, uploadImage , getAllDatas } from "../controllers/data.controllers.js";

const router = express.Router();


router.post("/financeData", addData);
router.get("/getFinanceData", getAllDatas);
router.post("/upload", upload.single("image"), uploadImage);

export default router;