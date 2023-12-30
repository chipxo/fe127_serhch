$("#submit").click(() => {
  const name = $("#name").val();
  const age = $("#age").val();
  const message = $("#message").val();

  if (!name || !age || !message) {
    alert("Fill out the form");
  } else {
    alert(`Your name: ${name}\nYour age: ${age}\nMessage: ${message}`);
  }
});
