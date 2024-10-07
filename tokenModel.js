const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "A teller token must be provided"],
            unique: true,
            trim: true,
        },

        institution: {
            type: String,
            required: [true, "A teller institution must be provided"],
            unique: false,
            trim: true,
        },

        enrollmentId: {
            type: String,
            required: [true, "A teller enrollment id must be provided"],
            unique: true,
            trim: true,
        },

        userId: {
            type: String,
            required: [true, "A teller user id must be provided"],
            unique: false,
            trim: true,
        },

        timestamp: {
            type: String,
            required: [true, "An entry must be timestamped"],
            trim: true
        }
    },
)

tokenSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;