const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  


// can add a const url and provide an RPC url, such as alchemy or infura 
// const url = 'https://...'
// const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.MAINNET;
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const init = async () => {
	const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
	console.log("DAI", dai)
	const weth = WETH[chainId];
	console.log("WETH data", weth)
	const pair = await Fetcher.fetchPairData(dai, weth);
    console.log("Pair address: ", pair);
	const route = new Route([pair], weth);
	const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
	console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
	console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
	console.log("-".repeat(45));
	console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
}

init();