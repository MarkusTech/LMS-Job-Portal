import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlenngth: 350,
      require: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlenngth: 5000,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default:
        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
    category: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: String,
      default: 0,
    },
    enrolls: {
      type: String,
      default: 0,
    },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
