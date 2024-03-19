const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    try {
        // Validate and sanitize inputs (Example: Using express-validator or similar library)

        let imageUrl = ''; // Initialize imageUrl as an empty string

        // Check if there is an image file in the request
        if (req.files && req.files.image) {
            let image = req.files.image;

            // Implement file validation here (e.g., check file type and size)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(image.mimetype)) {
                return res.status(400).send('Unsupported file type.');
            }

            const maxSize = 20 * 1024 * 1024; // 20 MB
            if (image.size > maxSize) {
                return res.status(400).send('File size exceeds limit.');
            }

            // Define the upload path using path module
            const rootDir = require('path').resolve(__dirname, '../'); // Adjusted to go two levels up from controllers directory
            const uploadPath = path.resolve(rootDir, 'public/assets/img', image.name);

            // Use async/await for file upload
            await image.mv(uploadPath);
            imageUrl = '/assets/img/' + image.name;
        }

        // Create a new blog post in the database
        await BlogPost.create({
            ...req.body,
            image: imageUrl, // Use the imageUrl, which may be an empty string if no image was uploaded
            userid: req.session.userId
        });

        // Redirect to home page after successful operation
        res.redirect('/');
    } catch (error) {
        // Log the error and redirect or send an error message
        console.error('File upload or database error:', error);
        res.status(500).send('Server error occurred.');
    }
};
