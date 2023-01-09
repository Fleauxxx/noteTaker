const noteTitle = document.getElementsByClassName('note-title');
const noteText = document.getElementsByClassName('note-textarea');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Create a new note object from the input values
    const newNote = {
      title: titleInput.value.trim(),
      text: textInput.value.trim(),
    }; console.log();
  
    // Call our postReview method to make a POST request with our `newNote` object.
    postNote(newNote)
      .then((data) => alert(`Review added! Review ID: ${data.body.review_id}`))
      .catch((err) => console.error(err));
  });
  