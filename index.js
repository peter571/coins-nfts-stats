import express from 'express';
import { fetchCoins } from './controlers/coins.js';
import { fetchNfts } from './controlers/nfts.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 5000;

app.get('/coins', async (req, res) => {
    try {
        const data = await fetchCoins();
        return res.status(200).json({ result: data });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/nfts', async (req, res) => {
    
    try {
        const data = await fetchNfts();
        return res.status(200).json({ result: data });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.listen(PORT, () => {
    console.log("Server running on http://localhost:7000")
})