const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const { ethers } = require("ethers");

// ABI mínimo para exemplo
const MINIMAL_ABI = [
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)"
];

exports.getContractInfo = asyncErrorHandler(async (req, res, next) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
        // Endereço do contrato USDT na Ethereum Mainnet
        const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
        
        const contract = new ethers.Contract(contractAddress, MINIMAL_ABI, provider);

        // Buscando informações do contrato
        const [name, symbol, totalSupply, decimals] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.totalSupply(),
            contract.decimals()
        ]);
        const formattedSupply = ethers.utils.formatUnits(totalSupply, decimals);

        console.log("Contract Information:");
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Decimals:", decimals);
        console.log("Total Supply:", formattedSupply);

        res.status(200).json({
            success: true,
            data: {
                name,
                symbol,
                decimals,
                totalSupply: formattedSupply
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

exports.getTokenHolderBalance = asyncErrorHandler(async (req, res, next) => {
    try {
        const { address } = req.params;
        
        const provider = new ethers.providers.JsonRpcProvider(
            `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        );

        const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
        const contract = new ethers.Contract(contractAddress, MINIMAL_ABI, provider);

        const [balance, decimals] = await Promise.all([
            contract.balanceOf(address),
            contract.decimals()
        ]);

        const formattedBalance = ethers.utils.formatUnits(balance, decimals);

        console.log("Holder Balance Information:");
        console.log("Address:", address);
        console.log("Balance:", formattedBalance, "USDT");

        res.status(200).json({
            success: true,
            data: {
                address,
                balance: formattedBalance
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});