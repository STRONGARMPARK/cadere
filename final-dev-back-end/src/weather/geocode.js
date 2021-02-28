const request = require("request-promise");

const geocode = async (postCode) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postCode}.json?access_token=pk.eyJ1Ijoic3Ryb25nYXJtIiwiYSI6ImNrazJ4NXh3YzA3czUydXBjZGJmbHl5c24ifQ.ABGBESgYPK-2Y2RxmyKyxg`;

    const info = await request(url, { json: true });

    return info.features[0].center;
};

module.exports = geocode;
