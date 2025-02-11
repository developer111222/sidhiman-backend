const mongoose = require('mongoose');
const slugify = require('slugify'); // Add this import for slugify

// Define the gallery schema
const gallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    // slug: {
    //     type: String,
    //     // unique: true, // Ensures the slug is unique
    //     required: false // We generate the slug automatically
    // }
},{timestamps:true});

// Pre-save hook to automatically generate a slug
// gallerySchema.pre('save', function (next) {
//     if (this.isModified('image') || this.isNew) {
//         // Generate the slug based on the image field
//         this.slug = slugify(this.image, { lower: true, strict: true });
//     }
//     next();
// });

// Create the model and export it
module.exports = mongoose.model('Gallery', gallerySchema);
