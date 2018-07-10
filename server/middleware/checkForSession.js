module.exports = function(req, res, next) {
  const { session } = req;

  if (!session.user) {
    session.user = {
      username: "",
      cart: [],
      total: 0
    };
  }
  //since we are creating our own middleware we have to make sure to add next so it goes to the next function
  next();
};
