var db = require(__base + 'db');
var bcrypt = require('bcrypt');
var config = require(__base + 'config');

var UserSchemaObj = {
    email: String,
    password: String
};

var userSchema = db.createSchema(UserSchemaObj);

userSchema.pre('save', function(next) {
    if(!this.isNew || !this.isModified('password')) { next(); return; }
    bcrypt.genSalt(config.db.saltRounds, (err, salt) => {
        if(err) { next(err); return; }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) { next(err); return; }
            this.password = hash;
            next();
        });
    });
});

module.exports = db.createModel('User', userSchema);