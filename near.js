// connect to NEAR
const near = new nearApi.Near({
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org'
  });
  
  // connect to the NEAR Wallet
  const wallet = new nearApi.WalletConnection(near, 'my-app');

  // connect to a NEAR smart contract
  const contract = new nearApi.Contract(wallet.account(), 'helloworld.ippishio.testnet', {
    viewMethods: [],
    changeMethods: ['greet']
  });
  const texxt = document.getElementById('texxt');
  const button = document.getElementById('add-text');
  const logoutbut = document.getElementById('log-out');
  if (!wallet.isSignedIn()) {
    button.textContent = 'SignIn with NEAR'
    logoutbut.style.visibility = "hidden";
  } else {
    logoutbut.style.visibility = "visible";
  }

 logoutbut.addEventListener('click', () => {
  wallet.signOut();
  window.location.reload();
  console.log("logged out");
 })

  // Either sign in or call the addMessage change method on button click
  button.addEventListener('click', () => {
    if (wallet.isSignedIn()) {
      contract.greet({
        args: { name: document.getElementById('name').value },
      }).then(greeting => {
        texxt.textContent = greeting;
        document.getElementById('err').textContent = greeting;
      });
    } else {
      wallet.requestSignIn({
        contractId: 'helloworld.ippishio.testnet',
        methodNames: ['greet']
      });
    }
  });