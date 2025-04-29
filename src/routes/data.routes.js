import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addData, uploadImage , getAllDatas, getDataWithId } from "../controllers/data.controllers.js";

const router = express.Router();


router.post("/financeData", addData);
router.get("/getFinanceData", getAllDatas);
router.get("/financeData/:id", getDataWithId);
router.post("/upload", upload.single("image"), uploadImage);

export default router;