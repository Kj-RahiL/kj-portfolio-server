/* eslint-disable no-console */
import config from '../config';
import { User } from '../modules/Auth/auth.model';

export const seed = async () => {
  try {
    //atfirst check if the admin exist of not
    const admin = await User.findOne({
      role: "admin",
      email: config.admin_email,
      status: "active",
    });
    if (!admin) {
      console.log('Seeding started...');

      await User.create({
        name: 'RahiiLaa',
        role: 'admin',
        email: config.admin_email,
        password: config.admin_password,
        profilePhoto: config.admin_profile_photo,
        mobileNumber: config.admin_mobile_number,
        status: 'active',
      });
      console.log('Admin created successfully...');
      console.log('Seeding completed...');
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};
