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
      type: Boolean,
      require: true,
    },
    phoneNumber: {
      type: Number,
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
      guest: {
        type: Number,
        default: 1984,
      },
      user: { type: Number, default: 0 }, // : 2001
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
