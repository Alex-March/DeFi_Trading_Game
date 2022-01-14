const ethers = require('ethers');
const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');

const url = 'https://eth-mainnet.alchemyapi.io/v2/1zC-l_jPQ8cLFAJxDCDzKHv3QqS7wxPs';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);


const chainId = 20200520; // need to replace with number 20200520
console.log(chainId);


const tokenAddress = "0x40945338Fd60044A2D56db8bA2eC46507590340C"; // must be checksummed

const init = async() => {
    const dai = {
        decimals: 18,
        symbol: undefined,
        name: undefined,
        chainId: 20200520,
        address: '0x40945338Fd60044A2D56db8bA2eC46507590340C'
      }


    const weth = {
        decimals: 18,
        symbol: undefined,
        name: undefined,
        chainId: 20200520,
        address: '0x53380c9EBe8851a2C965ddA342cAe22e59144Bfc'
      }


    const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
    const route = new Route([pair], weth);
    const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
    console.log(route.midPrice.toSignificant(6));
    console.log(route.midPrice.invert().toSignificant(6));
    console.log(trade.executionPrice.toSignificant(6));
    console.log(trade.nextMidPrice.toSignificant(6));

}

init();

// const decimals = 18;
// const DAI = new Token(chainId, tokenAddress, decimals);
