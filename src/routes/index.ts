import { Router } from "express";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);

router.get("/", (req, res) => {
  res.json({ ok: true, message: "API routes root" });
});

export default router;
