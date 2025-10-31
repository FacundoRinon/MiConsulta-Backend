import { Router } from "express";
import { userRouter } from "./user.routes";
import { professionalRouter } from "./professional.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/professionals", professionalRouter);

router.get("/", (req, res) => {
  res.json({ ok: true, message: "API routes root" });
});

export default router;
