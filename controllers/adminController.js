const db = require("../routes/db_config");
const path = require("path");

function renderadmin(req, res) {
  const connection = db.createConnection();

  // Query the properties and users tables
  const query = `
    SELECT p.*, u.username
    FROM properties p
    INNER JOIN users u ON p.user_id = u.user_id
    WHERE p.approved = 'unapproved'
  `;

  connection.query(query, function(err, results) {
    if (err) {
      throw err;
    }

    // Pass the retrieved data to the EJS template
    res.render('admin', { properties: results });

    // Close the database connection
    connection.end();
  });
}

function updatePropertyStatus(req, res) {
  const connection = db.createConnection();
  const propertyId = req.body.propertyId;
  console.log(propertyId.type);

  // Update the 'approved' value to 'approved' for the selected property
  const updateQuery = `
  UPDATE properties
  SET approved = 'approved'
  WHERE propertyId = ?
`;

  connection.query(updateQuery, [propertyId], function(err, result) {
    if (err) {
      throw err;
    }

    // Redirect back to the admin page after the update
    res.redirect('/admin');

    // Close the database connection
    connection.end();
  });
}

module.exports = {
  renderadmin,
  updatePropertyStatus
};
