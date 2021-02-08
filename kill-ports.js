const kill = require("kill-port");

const killPorts = async () => {
  await kill(3000, "tcp");
};

killPorts();
