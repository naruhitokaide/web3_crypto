// https://eth-ropsten.alchemyapi.io/v2/1Fu4Jn3DcjegvS56l2UINAshrHVdtPJz

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/1Fu4Jn3DcjegvS56l2UINAshrHVdtPJz',
      accounts: ['c9c4b7e083ce851abaac82fb79be13b647460072bf671bc9358f316880e3e846'],
    },
  },
};
