const myMiddleware = (req, res, next) => {
  console.log("Custom middleware");
  next();
};

const myMiddlewareSec = (req, res, next) => {
  console.log("Anohter custom middleware");
  next();
};

module.exports = {myMiddleware, myMiddlewareSec};
