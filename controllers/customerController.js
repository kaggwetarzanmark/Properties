const db = require("../routes/db_config");
//const path = require("path");
const commentmodel = require('../model/commentmodel');
function renderCustomer(req, res) {
    const connection = db.createConnection();
  
    // Retrieve approved properties from the database
    const query = "SELECT * FROM properties WHERE approved = 'approved'";
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving properties:", err);
        // Handle the error appropriately (e.g., send an error response)
        res.status(500).json({ error: "Failed to retrieve properties" });
      } else {
        const properties = results; // Assign the retrieved properties to the 'properties' variable
        res.render('customer', { properties: properties }); // Pass the 'properties' variable to the template
      }
  
      // Close the database connection
      connection.end();
    });
  }

  function commentsHandler(req, res) {
    const { comment } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in req.user.id
    const propertyId = req.params.id;
    const createdAt = new Date();
  
    console.log("Received comment:", comment);
    console.log("User ID:", userId);
    console.log("Property ID:", propertyId);
  
    const commentData = {
      user_id: userId,
      property_id: propertyId,
      comment: comment,
      created_at: createdAt
    };
  
    commentModel.createComment(commentData)
      .then(result => {
        console.log("Comment saved to database:", result);
        // Handle the successful comment submission (e.g., send a success response)
        res.status(200).json({ message: "Comment saved successfully" });
      })
      .catch(error => {
        console.error("Error saving comment to database:", error);
        // Handle the error appropriately (e.g., send an error response)
        res.status(500).json({ error: "Failed to save comment" });
      });
  }
  
  
  
module.exports = {
    renderCustomer,commentsHandler
}