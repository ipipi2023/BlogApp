const BlogPost = require('../models/BlogPost');
const path = require('path');
module.exports = async (req, res) => {

    try {
        // Validate and sanitize inputs (Example: Using express-validator or similar library)

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let image = req.files.image;

        // Implement file validation here (e.g., check file type and size)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(image.mimetype)) {
            return res.status(400).send('Unsupported file type.');
        }

        const maxSize = 20 * 1024 * 1024; // 5 MB
        if (image.size > maxSize) {
            return res.status(400).send('File size exceeds limit.');
        }

        // Define the upload path using path module
        const rootDir = require('path').resolve(__dirname, '../'); // Adjusted to go two levels up from controllers directory
        const uploadPath = path.resolve(rootDir, 'public/assets/img', image.name);

        // Use async/await for file upload
        await image.mv(uploadPath);
        imageUrl = '/assets/img/' + image.name;
        //console.log(imageUrl);
        // Create a new blog post in the database
        await BlogPost.create({
            ...req.body,
            image: imageUrl, //create image path in BlogPost Model 
            userid: req.session.userId
        });

        // Redirect to home page after successful upload and database operation
        res.redirect('/');
    } catch (error) {
        // Log the error and redirect or send an error message
        console.error('File upload or database error:', error);
        res.status(500).send('Server error occurred.');
    }
};
