const Review = require("../model/Review.js");

exports.postReview = async (req, res) => {
  try {
    const obj = req.body;
    const existingReview = await Review.findOne({
      user_rating_id: obj.user_rating_id,
    });
    if (existingReview) {
      let SDCREVIEWVARIABLE = await Review.aggregate([
        { $group: { _id: null, average: { $avg: "$average" } } },
      ]);
      SDCREVIEWVARIABLE =
        SDCREVIEWVARIABLE.length > 0 ? SDCREVIEWVARIABLE[0].average : 0;
      return res.status(403).json({
        success: "false",
        message: "You have already rated this website.",
        SDCREVIEWVARIABLE,
      });
    }
    const objCreated = await Review.create({
      name: obj.name,
      ratings: obj.ratings,
      average: obj.average,
      user_rating_id: obj.user_rating_id,
    });
    let SDCREVIEWVARIABLE = await Review.aggregate([
      { $group: { _id: null, average: { $avg: "$average" } } },
    ]);
    SDCREVIEWVARIABLE =
      SDCREVIEWVARIABLE.length > 0 ? SDCREVIEWVARIABLE[0].average : 0;
    if (SDCREVIEWVARIABLE < 4) {
      SDCREVIEWVARIABLE = (4 + Math.random() * 0.2).toFixed(1);
      SDCREVIEWVARIABLE = parseFloat(SDCREVIEWVARIABLE);
      SDCREVIEWVARIABLE = parseFloat(SDCREVIEWVARIABLE.toFixed(2));
    }
    console.log(`📌 New review created!`);
    console.log(`👤 Reviewer Name: ${obj.name}`);
    console.log(`⭐ Ratings given: ${obj.ratings.join(", ")}`);
    console.log(`📊 Average Rating: ${SDCREVIEWVARIABLE.toFixed(2)}`);

    res.status(200).json({
      success: "true",
      message: "Review logged successfully",
      objCreated,
      SDCREVIEWVARIABLE,
    });
  } catch (err) {
    res.status(500).json({
      success: "false",
      message: "Rijul Server error",
    });
  }
};
