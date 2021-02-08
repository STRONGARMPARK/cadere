const concurrently = require("concurrently");
const kill = require("kill-port");

//sudo lsof -i tcp:3000

//lsof -nP +c 15 | grep LISTEN

//sudo lsof -iTCP -sTCP:LISTEN | grep mongo

const startUp = async () => {
  try {
    await kill(4000, "tcp");
    await kill(3000, "tcp");
    await concurrently([
      "sudo mongod --dbpath '/Users/gavinfogel/Mongo/data/db'",
      "cd back-end && npm run dev",
      "cd front-end && cd clothing && yarn start",
    ]);
  } catch (e) {
    await kill(4000, "tcp");
    await kill(3000, "tcp");
    await concurrently([
      "cd back-end && npm run dev",
      "cd front-end && cd clothing && yarn start",
    ]);
  }
};

startUp();