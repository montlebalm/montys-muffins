var users = {};

module.exports = {
  pooped: function(user) {
    if (!users[user]) {
      users[user] = 0;
    }
    users[user] += 1;

    return Promise.resolve(users[user]);
  }
};
