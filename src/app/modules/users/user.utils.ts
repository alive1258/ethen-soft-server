import { Customer } from "../customers/customer.module";
import { User } from "./user.module";

export const findLatestUser = async (): Promise<string | undefined> => {
  const latestUser = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return latestUser?.id ? latestUser.id.substring(5) : undefined;
};

export const generateUserId = async (): Promise<string> => {
  // find current user id
  const currentId = (await findLatestUser()) || (0).toString().padStart(5, "0");
  //increment by 1

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  incrementedId = `admin${incrementedId}`;
  return incrementedId;
};

export const findLatestCustomer = async (): Promise<string | undefined> => {
  const latestCustomer = await Customer.findOne(
    {
      role: "customer",
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return latestCustomer?.id ? latestCustomer.id.substring(8) : undefined;
};

export const generateCustomerId = async (): Promise<string> => {
  // find current user id
  const currentId =
    (await findLatestCustomer()) || (0).toString().padStart(5, "0");
  //increment by 1

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  incrementedId = `customer${incrementedId}`;
  return incrementedId;
};
