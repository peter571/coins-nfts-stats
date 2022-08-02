import * as cheerio from 'cheerio';
import axios from 'axios';

export async function getNfts() {
    const siteUrl = "https://coinmarketcap.com/view/collectibles-nfts/";

    const { data } = await axios.get(siteUrl);
    const nfts = [];

    const $ = cheerio.load(data);
    const elSelector = '.h7vnx2-2 > tbody:nth-child(3) > tr';

    const keys = ['rank', 'name', 'price', '1h', '24h', '7d', 'marketCap', 'volume', 'circulatingSupply'];

    $(elSelector).each((parentIdx, parentElem) => {
        let keyIdx = 0;
        const obj = {};

        const logo = $(parentElem).find($('.coin-logo')).attr('src');

        if (parentIdx < 10) {

            $(parentElem).children().each((childIdx, childElem) => {
                let tdValue = $(childElem).text();

                if (keyIdx === 1) {
                    tdValue = $('p:first-child', $(childElem).html()).text();
                }

                if (keyIdx === 6) {
                    tdValue = $('span:first-child', $(childElem).html()).text();
                }

                if (keyIdx === 7) {
                    tdValue = $('a:first-child', $(childElem).html()).text();
                }

                if (tdValue) {
                    obj[keys[keyIdx]] = tdValue;
                    keyIdx++;
                }
            })
            obj.logo = logo;
            nfts.push(obj);
        }
    })

    return nfts;
}