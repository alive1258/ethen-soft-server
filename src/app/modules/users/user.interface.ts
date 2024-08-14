export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type User = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  email: string;
  contactNo: string;
  profileImage?: string;
};
