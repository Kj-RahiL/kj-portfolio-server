export type TLoginUser = {
  email: string;
  password: string;
};


export type TUser = {
  name: string,
  role: 'admin',
  email: string,
  password: string,
  profilePhoto: string,
  mobileNumber: string,
  status: 'active',
};
