const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true
    },

    body: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true,
      min: [20, "Body should be at least 20 characters"]
    },

    published: {
      type: Boolean,
      required: true,
      default: true
    },

    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must have an author"]
    },

    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: []
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post"
});

postSchema.pre(/^find/, function(next) {
  this.populate({ path: "author" }).populate({ path: "likes" });
  next();
});

module.exports = mongoose.model("Post", postSchema);
