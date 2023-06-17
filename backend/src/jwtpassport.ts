import * as passport from "passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

import { model as User } from "./models/user";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload: any, done: VerifiedCallback) => {
    try {
      let user = await User.findOne({
        email: jwt_payload.email,
      }).exec();

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "The user in the token was not found",
        });
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
