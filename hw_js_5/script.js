$("#submit").click(() => {
  const name = $("#name").val();
  const age = $("#age").val();
  const message = $("#message").val();

  if (!name || !age || !message) {
    alert("Please fill out the form completely.");
  } else {
    alert(`Your name: ${name}\nYour age: ${age}\nMessage: ${message}`);
  }
});
