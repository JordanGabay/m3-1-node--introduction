// here there be JS, yarrr ☠️
const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

const handleFocus = () => {
  messageInput.focus();
};

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();
  const message = { author: "user", text: messageInput.value };
  updateConversation(message);

  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      updateConversation(data.message);
    });

  console.log(messageInput.value);
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  // deconstruct the message object
  const { author, text } = message;
  // create a <p> element
  const messageElem = document.createElement("p");
  // add the text message to the element
  messageElem.innerHTML = `<span>${text}</span>`;
  // add a 'message' class and a class based on the author
  messageElem.classList.add("message", author);
  if (author === 'user') {
    messageInput.value = '';
  }
  // append the element to the conversation
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  handleFocus();
};
// console.log(handleFocus());

handleFocus();
