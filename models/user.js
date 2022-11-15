const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(AutoIncrement, { id: "user_id", inc_field: "id" });

module.exports = User = mongoose.model("user", UserSchema);
