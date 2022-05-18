const models = require("../models");
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
    async function(token, done) {
        const userSession = await models.UserSession.findOne({
            where: {
                authToken: token
            }
        })
        if (!userSession) { 
            return done(null, false); 
        }      
        const user = await userSession.getUser();  
        return done(null, user);        
    }
));

const bearerAuthenticated = function(req, res, next){
    passport.authenticate('bearer',  
        function(err, user, info) {
            if (err) { 
                return next(err); 
            }

            //authentication error
            if (!user) { 
                return res.json({error: info.message || 'Access Denied'}) 
            }

            //success 
            req.logIn(user, { session: false },  function(err) {
                if (err) { return next(err); }
                    return next();
                }
            );

    })(req, res, next)

}

module.exports  = bearerAuthenticated

