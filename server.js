const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

app.use(cors());

let transactions = [];

// Sample titles and descriptions
const titles = [
  "Purchase at Store A",
  "Payment for Service B",
  "Refund from Store C",
  "Subscription to Service D",
  "Transfer to Account E",
  "Deposit from Account F",
  "Withdrawal at ATM G",
  "Online Payment for Product H",
  "Purchase from Fairprice"
];

const descriptions = [
  "Grocery shopping",
  "Monthly subscription fee",
  "Refund for returned item",
  "Annual membership fee",
  "Transfer to savings account",
  "Deposit from paycheck",
  "ATM cash withdrawal",
  "Payment for digital product"
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateTransaction = () => {
  const transaction = {
    id: transactions.length + 1,
    time: new Date().toISOString(),
    title: getRandomElement(titles),
    description: getRandomElement(descriptions),
    amount_spent: Math.floor(Math.random() * 100) // Generate whole numbers
  };
  transactions.push(transaction);
  io.emit('new_transaction', transaction);
};

setInterval(generateTransaction, 10000); // generate transaction every 10 seconds

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
