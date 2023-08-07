document.addEventListener("DOMContentLoaded", () => {
  const serverMessageDisplay = document.querySelector(".server-message");
  const myMessageDisplay = document.querySelector(".my-message");
  const inputMessage = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", () => {
    const message = inputMessage.value;
    if (message.trim() !== "") {
      displayMessage("My", message);
      inputMessage.value = "";
      // Send the message to the endpoint
      fetch("http://localhost:4000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: message }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse response as JSON
          } else {
            // Handle error
            throw new Error("Message not sent.");
          }
        })
        .then((data) => {
          // Handle the response data
          displayServerMessage("Server", data.result);
        })
        .catch((error) => {
          // Handle error
        });
    }
  });
  function displayMessage(sender, message) {
    if (sender == "My") {
      const myMessageSpan = document.getElementById("my-message-span");
      myMessageSpan.textContent = message;
     
    }
  }
  function displayServerMessage(sender, message) {
    if (sender == "Server") {
      const serverMessageSpan = document.getElementById("server-message-span");
      serverMessageSpan.textContent = message;
    
    }
  }
});
