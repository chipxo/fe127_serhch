$("#myForm").submit((e) => {
  e.preventDefault();

  const name = $("#name").val();
  const age = $("#age").val();
  const message = $("#message").val();

  !name || !age || !message
    ? alert("Fill out the form")
    : alert(`Your name: ${name}\nYour age: ${age}\nMessage: ${message}`);
});
