const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        minlength: [1, 'Name must have at least 1 character.'],
        maxlength: [100, 'Name cannot exceed 100 characters.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
        minlength: [1, 'Email must have at least 1 character.'],
        maxlength: [1000, 'Email cannot exceed 1000 characters.'],
        // validate: {
        //     validator: function (value) {
        //         // Custom email validation using regular expression
        //         // You can customize the regular expression as per your requirement
        //         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        //     },
        //     message: 'Invalid email address.',
        // },
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [1000, 'Password cannot exceed 1000 characters.'],
        // validate: {
        //     validator: function (value) {
        //         // Custom password validation using regular expression
        //         // You can customize the regular expression as per your requirement
        //         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value);
        //     },
        //     message:
        //         'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        // },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const userModel = mongoose.model('user-login', userSchema);

module.exports = userModel;
