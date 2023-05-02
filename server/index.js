const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0452ac959f3e3da3438e2bbcf028c75c87d0cc8361c421bb5afaf264ae8d1b9c0c197244c12e5f1e6bcbde9ec15b1e6ddb18939b8ff93aefb71dff35d6e758acdb": 100,
  "043e01d430137dbdfe5e8db3ab16feb616d683be9a25d365752acce6365f6f159b33e9d0bebe39bb5072d0e64bef2cedd2abb08ce62c8e511718108149559bb5ba": 50,
  "049c0fb72b64d949730c89c7aae339b0577535ecc6c75c7bb8b0f499876e860151967101181d6b351d83e8376e26372c4837aa55720931101cfbfbc9886cae31bd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
