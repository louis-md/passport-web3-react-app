document.addEventListener('DOMContentLoaded', () => {
  console.log('script.js loaded successfully');
}, false);

var ethjsPersonalSignButton = document.getElementById("ethjsPersonalSignButton");

function connect() {
  console.log("Function connect() called");
  if (typeof ethereum !== "undefined") {
    ethereum.enable().catch(console.error);
  } 
}

ethjsPersonalSignButton.addEventListener("click", function(event) {
  console.log("sign message function called")
  event.preventDefault();
  var from = web3.eth.accounts[0];
  if (!from) return connect();
  web3.personal.sign(web3.fromUtf8("Please sign this message. Thanks! Contacth team"), web3.eth.coinbase, console.log);
});
