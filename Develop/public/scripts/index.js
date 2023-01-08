const noteTitle = document.getElementsByClassName('note-title');
const noteText = document.getElementsByClassName('note-textarea');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Create a new review object from the input values
    const newReview = {
      username: userNameInput.value.trim(),
      product: productInput.value.trim(),
      review: reviewInput.value.trim(),
    }; console.log();
  
    // Call our postReview method to make a POST request with our `newReview` object.
    postReview(newReview)
      .then((data) => alert(`Review added! Review ID: ${data.body.review_id}`))
      .catch((err) => console.error(err));
  });
  