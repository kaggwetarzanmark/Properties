// Import the database connection
const db = require("../routes/db_config");

// Create a new comment
function createComment(comment) {
  return new Promise((resolve, reject) => {
    const connection = db.createConnection();

    // Insert the comment into the database
    connection.query('INSERT INTO comments SET ?', comment, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end(); // Close the database connection
    });
  });
}

// Get all comments
function getComments() {
  return new Promise((resolve, reject) => {
    const connection = db.createConnection();

    // Retrieve all comments from the database
    connection.query('SELECT * FROM comments', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end(); // Close the database connection
    });
  });
}

module.exports = {
  createComment,
  getComments
};
