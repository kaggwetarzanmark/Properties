// Add a new comment
function addComment(req, res) {
    const { propertyId, commentText } = req.body;
    const userId = req.user.id; // Assuming you have the authenticated user's ID available in req.user
  
    // Construct the comment object
    const comment = {
      userId,
      propertyId,
      commentText,
      createdAt: new Date(),
    };
  
    // Add the comment to a client-side array or data structure to store the comments
    // For example, you can have an array in your frontend code:
    // comments.push(comment);
  
    console.log('Comment added successfully');
    return res.status(200).json({ message: 'Comment added successfully' });
  }
  
  module.exports = {
    addComment,
  };
  