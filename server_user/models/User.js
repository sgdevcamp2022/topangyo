const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      require: true,
    },
    gender: {
      type: Number,
      require: true,
    },
    phoneNumber: {
      type: String,
      // require : true,
    },

    currentPlace: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },

    OAuth: {
      provider: {
        type: String,
      },
      snsId: {
        type: Number,
      },
    },
    roles: {
      user: { type: Number, default: 2001 },
      admin: { type: Number, default: 0 }, //: 5150
    },
    refreshToken: {
      type: String,
    },
    notification: {
      type: Boolean,
      default: false,
    },
    matchingStatus: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", UserSchema);
module.exports = User;
