export const getSender = (loggedUser, users) => {
  return loggedUser._id === users[0]._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return loggedUser._id === users[0]._id ? users[1] : users[0];
};

export const isThisUserLastMessage = (messages, i) => {
  if (i === messages.length - 1) return true;
  if (messages[i].sender._id !== messages[i + 1].sender._id) return true;
  return false;
};