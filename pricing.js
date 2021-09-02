
/* calculatePrice(profitMargin) determines the ideal price for an item based off the profitMargin parameter
that is passed in, as well as other values of input that the user will provide in the <form> element */
function calculatePrice(profitMargin) {
    /* formula for calculating an ideal listing price range based off several inputs (the shipping charge, price of
        offsite ads, price of etsy ads, the cost to make the item, the cost to ship the item, and the desired profit
        margin range) Formula is derived from the one used to calculate profit in my Etsy Profit Calculator project
        <-- FORMULA -->
        listingPrice = 
        (0.9182 * shippingCharge - offsiteAds * shippingCharge - 0.45 - etsyAds - itemCost- shippingCost) / 
        (profitMargin - 0.9182 + offsiteAds)
    */
   const offsiteAds = document.getElementById('offsiteAds');
   let offsiteAdsFee = parseFloat(offsiteAds.options[offsiteAds.selectedIndex].value);
   let shippingCharge = parseFloat(document.getElementById('shippingCharge').value);

   let numerator = shippingCharge * 0.9182 - shippingCharge * offsiteAdsFee - 0.45 - 
                    parseFloat(document.getElementById('etsyAds').value) - 
                    parseFloat(document.getElementById('itemCost').value) - 
                    parseFloat(document.getElementById('shippingCost').value);
    let denominator = profitMargin - 0.9182 + offsiteAdsFee;
    let listingPrice = numerator / denominator;
    listingPrice = listingPrice.toFixed(2);
    if (listingPrice < 0) {
        return 'Impossible';
    }
    else {
        return listingPrice;
    }
}

function findPrices() {
    
    let minProfitMargin = (parseFloat(document.getElementById('minProfitMargin').value)) / 100;
    let maxProfitMargin = (parseFloat(document.getElementById('maxProfitMargin').value)) / 100;

    let minPrice = calculatePrice(minProfitMargin);
    let maxPrice = calculatePrice(maxProfitMargin);
    
    if (minPrice === 'Impossible' || maxPrice === 'Impossible') {
        document.getElementById('priceRange').innerHTML = 'It would be impossible to attain this profit margin range with the values you have currently entered.';
    }
    else {
        document.getElementById('priceRange').innerHTML = `$${minPrice} - $${maxPrice}`;
    }
}

