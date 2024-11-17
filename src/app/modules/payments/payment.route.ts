import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

// Route to get all payment
router.get("/:id", PaymentController.getAllPayments);

// Route to create payment
router.post("/", PaymentController.paymentCreate);

// Route to success payment  by ID
router.post("/success/:id", PaymentController.paymentSuccess);

// Route to fail payment  by ID
router.post("/fail/:id", PaymentController.paymentFail);

// Route to cancel payment  by ID
router.post("/cancel/:id", PaymentController.paymentCancel);

export const PaymentRoutes = router;
