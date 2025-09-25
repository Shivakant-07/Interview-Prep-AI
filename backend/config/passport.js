import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                // const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

                // ✅ 1. Check if user exists by email
                let user = await User.findOne({ email });

                if (user) {
                    if (!user.googleId) {
                        // 🚫 Email already registered using local signup
                        return done(null, false, {
                            message: "Account already exists. Please login with email & password."
                        });
                    }
                    // ✅ Existing Google user
                    return done(null, user);
                }

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: email,
                        profileImageUrl: profile.photos[0].value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
