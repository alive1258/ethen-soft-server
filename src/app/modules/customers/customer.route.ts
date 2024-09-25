import express from "express";
import { CustomerController } from "./customer.controller";
import { CustomerValidation } from "./customer.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

//create a customer route
router.post(
  "/create-customer",
  validateRequest(CustomerValidation.createCustomerValidationSchema),
  CustomerController.createCustomers
);

//get all customers route
router.get("/", CustomerController.getAllCustomers);

//get single customer route
router.get(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  CustomerController.getSingleCustomer
);

//update single customer route
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.CUSTOMER),
  validateRequest(CustomerValidation.updateCustomerValidationSchema),
  CustomerController.updateCustomer
);

// delete single customer route
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  CustomerController.deleteSingleCustomer
);

export const CustomerRoutes = router;
