import { Router } from "express";
import { userRouter } from "./user.routes";
import { professionalRouter } from "./professional.routes";
import { availabilityRouter } from "./availability.routes";
import { availabilityStateRouter } from "./availabilityState.routes";
import { branchRouter } from "./branch.routes";
import { consultTypeRouter } from "./consultType.routes";
import { consultRouter } from "./consult.routes";
import { countryRouter } from "./country.routes";
import { documentTypeRouter } from "./documentType.routes";
import { locationRouter } from "./location.routes";
import { modalityRouter } from "./modality.routes";
import { professionRouter } from "./profession.routes";
import { professionalStateRouter } from "./professionalState.routes";
import { recurrenceGroupRouter } from "./recurrenceGroup.routes";
import { recurrencePatternRouter } from "./recurrencePattern.routes";
import { userStateRouter } from "./userState.routes";

const router = Router();

router.use("/availabilities", availabilityRouter);
router.use("/availabilityStates", availabilityStateRouter);
router.use("/branches", branchRouter);
router.use("/consults", consultRouter);
router.use("/consultTypes", consultTypeRouter);
router.use("/countries", countryRouter);
router.use("/documentTypes", documentTypeRouter);
router.use("/locations", locationRouter);
router.use("/modalities", modalityRouter);
router.use("/professions", professionRouter);
router.use("/professionals", professionalRouter);
router.use("/professionalStates", professionalStateRouter);
router.use("/recurrenceGroups", recurrenceGroupRouter);
router.use("/recurrencePatterns", recurrencePatternRouter);
router.use("/users", userRouter);
router.use("/userStates", userStateRouter);

router.get("/", (req, res) => {
  res.json({ ok: true, message: "API routes root" });
});

export default router;
