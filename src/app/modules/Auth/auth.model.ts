import { model, Schema } from "mongoose";
import { TUser } from "./auth.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    mobileNumber: {
      type: String,
    },
    profilePhoto: {
      type: String,
    }, 
    status: {
      type: String,
      enum: ['active','blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);


// query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it is being modified
  if (!user.isModified('password')) {
    return next();
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
})

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
