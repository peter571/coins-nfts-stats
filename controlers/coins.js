import axios from 'axios';

export const fetchCoins = async () => {
    const siteUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h';
    try {
        const { data } = await axios({
            method: 'GET',
            url: siteUrl,
            headers: {
                'accept': 'application/json'
            },
        });

        /**Sort using the 24 hour percentage value*/
        // data.sort((a, b) => {
        //     return parseFloat(b. price_change_percentage_24h_in_currency) - parseFloat(a. price_change_percentage_24h_in_currency)
        // })

        const sortedData = data.map((el) => {
            const mktbearish = el.price_change_percentage_24h_in_currency > 0 ? true : false;
            const reg = /([?])\w+/g

            const logo = el.image.replace(reg, "");

            return {
                id: el.id,
                image: logo,
                prices: el.sparkline_in_7d.price,
                name: el.name,
                symbol: el.symbol,
                price: el.current_price?.toFixed(3),
                percent_change_24h: el.price_change_percentage_24h_in_currency?.toFixed(3),
                percent_change_1h: el.price_change_percentage_1h_in_currency?.toFixed(3),
                bearish: mktbearish
            }
        })

        return sortedData;

    } catch (error) {
        console.log(error)
    }
}