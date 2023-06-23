const path = require("path");
const db = require("../routes/db_config");

const connection = db.createConnection();

function renderReportsPage(req, res) {
  if (req.session.user && req.session.user.user_type === "landlord") {
    res.render('landlord.ejs');
  } else {
    res.redirect("/");
  }
}
const addProperty = (req, res) => {
  // Retrieve the form data from the request body
  const { propertyName, Type, location, bedrooms, bathrooms, description, cost, created_at } = req.body;

  // Check if files were included in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    console.error('No files were uploaded');
    res.render('landlord', { message: 'No files were uploaded' }); // Pass error message to the template
    return;
  }

  // Retrieve the file from the request
  const photo = req.files.photos; // Assuming the input name is "photos"

  // Generate a unique filename to avoid conflicts
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileName = 'photo-' + uniqueSuffix + path.extname(photo.name);

  // Move the file to the designated folder
  photo.mv(path.join('uploads/', fileName), (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.render('landlord', { message: 'Error uploading file' }); // Pass error message to the template
      return;
    }

    // Get the user ID of the currently logged-in user
    const user_id = req.session.user.user_id; // Adjust the property name as per your session structure

    // Create an object with the form data, file path, the user ID, and the default value for 'approved'
    const property = {
      propertyName,
      Type,
      location,
      bedrooms,
      bathrooms,
      description,
      cost,
      created_at,
      photos: fileName, // Store the file path in the database
      user_id,
      approved: 'unapproved' // Set 'approved' to 'unapproved' by default
    };

    // Insert the property data into the database
    connection.query('INSERT INTO properties SET ?', property, (err, result) => {
      if (err) {
        console.error('Error storing property:', err);
        res.render('landlord', { message: 'Error storing property' }); // Pass error message to the template
        return;
      }

      console.log('Property stored in the database');
      res.render('landlord', { message: 'Property stored successfully' }); // Pass success message to the template
    });
  });
};



module.exports = {
  addProperty,
  renderReportsPage
};
