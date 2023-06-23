const db = require("../routes/db_config");
const path = require("path");

function renderlandlordviewPage(req, res) {
  // Get the user ID from the session
  const user_id = req.session.user.user_id;
  console.log(user_id)

  const connection = db.createConnection();

  connection.query('SELECT propertyName, type, location, description, bedrooms, bathrooms, cost, photos, created_at, approved FROM properties WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error retrieving property data from the database: ', err);
      res.render('error.ejs'); // Render an error page or handle the error as needed
      return;
    }

    res.render('landlordview', { properties: results });
  });

  connection.end(); // Close the connection
}

function updateProperty(req, res) {
  const propertyId = req.params.propertyId; // Access the propertyId from the URL parameter
  const modifiedData = {
    type: req.body.type,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    description: req.body.description,
    cost: req.body.cost
  };
 console.log(modifiedData)
  const connection = db.createConnection();

  connection.query('UPDATE properties SET ? WHERE propertyId = ?', [modifiedData, propertyId], (err, result) => {
    if (err) {
      console.error('Error updating property in the database: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.redirect('/landlordview'); // Redirect back to the landlord view page
  });

  connection.end(); // Close the connection
}

function deleteProperty(req, res) {
  const propertyName = req.body.propertyName;
  console.log(propertyName)

  const connection = db.createConnection();

  connection.query('DELETE FROM properties WHERE propertyName = ?', [propertyName], (err, result) => {
    if (err) {
      console.error('Error deleting property from the database: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.redirect('/landlordview'); // Redirect back to the landlord view page
  });

  connection.end(); // Close the connection
}





module.exports = {
  renderlandlordviewPage,
  updateProperty,
  deleteProperty
};
