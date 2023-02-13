const { Schema, model } = require("mongoose");

const MatchingSchema = new Schema(
  {
    room: {
      type: String,
    },
    host: {
      type: String,
    },
    members: {
      type: [],
    },
    applyUser: {
      type: [],
    },
    chatUser: {
      type: [],
    },
    matchingStatus: {
      type: String,
    },
    place: {
      type: String,
    },
    meetingDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Matching = model("matching", MatchingSchema);
module.exports = Matching;
