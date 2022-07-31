import axios from "axios";
import 'dotenv/config'

export async function fetchNfts() {
    const siteUrl = `https://ubiquity.api.blockdaemon.com/v1/nft/ethereum/mainnet/collections?verified=true&apiKey=${process.env.API_KEY}`;

    try {
        const { data } = await axios({
            method: 'GET',
            url: siteUrl,
            headers: {
                'accept': 'application/json'
            },
        });

        return data;
        
    } catch (error) {
        console.log(error);
    }
}