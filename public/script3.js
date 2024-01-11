let products = [];
let total = 0;

function add(product, price) {
    console.log(product, parseInt(price));
    products.push(product);
    total = total + parseInt(price);
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

function pay() {
    window.alert(products.join(", \n"));
}