import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model";
import config from "./config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log("Google profile:", profile);
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return cb(
            new Error("Google account does not provide an email"),
            false,
          );
        }
        const existingGoogleUser = await User.findOne({
          googleId: profile.id,
        });
        if (existingGoogleUser) {
          return cb(null, existingGoogleUser);
        }

        const existingEmailUser = await User.findOne({ email });

        if (existingEmailUser) {
          existingEmailUser.googleId = profile.id;
          await existingEmailUser.save();
          return cb(null, existingEmailUser);
        }

        const newUser = await User.create({
          fullName: profile.displayName,
          email,
          googleId: profile.id,
          role: "buyer",
        });
        return cb(null, newUser);
      } catch (error) {
        return cb(error, false);
      }
    },
  ),
);

export default passport;
