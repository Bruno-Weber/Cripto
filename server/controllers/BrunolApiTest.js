const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const { ethers } = require("ethers");

// ABI mínimo para buscar informações básicas do token
const MINIMAL_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function owner() view returns (address)"
];
exports.getTokenInfo = asyncErrorHandler(async (req, res, next) => {
    try {
        // Usando Infura como provider
        const provider = new ethers.providers.JsonRpcProvider(
            `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        );

        // Endereço do contrato LINK token como exemplo
        const contractAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
        
        const contract = new ethers.Contract(contractAddress, MINIMAL_ABI, provider);

        // Buscando informações do contrato
        const [name, symbol, decimals, totalSupply, owner] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.decimals(),
            contract.totalSupply(),
            contract.owner().catch(() => "Not available")
        ]);

        const formattedSupply = ethers.utils.formatUnits(totalSupply, decimals);

        console.log("\n=== Token Information ===");
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Decimals:", decimals);
        console.log("Total Supply:", formattedSupply);
        console.log("Owner:", owner);
        console.log("=====================\n");

        res.status(200).json({
            success: true,
            data: {
                name,
                symbol,
                decimals,
                totalSupply: formattedSupply,
                owner
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
