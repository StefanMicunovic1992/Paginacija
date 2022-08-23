const baseUrl = "https://api.coinranking.com/v2/coins";
const proxyUrl = "https://protected-sea-17533.herokuapp.com/"

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let fourthNumber = document.querySelector('#fourthNumber');
let fifthNumber = document.querySelector('#fifthNumber');

let firstPage = document.querySelector('#firstPage');
let lastPage = document.querySelector('#lastPage');





let coinsData = [];

let curPage = 1;
let pagseSize = 5;



async function getData() {

    const res = await fetch(proxyUrl + baseUrl);
    const coins = await res.json();

    coinsData = coins.data.coins;
}


async function rendertable(page=1) {

    await getData();
    if (page == 1) {
        document.getElementById("previous").style.visibility = "hidden";
        firstPage.style.visibility = "hidden";
        firstNumber.style.backgroundColor = 'lightgray';
    }else {
        document.getElementById("previous").style.visibility = "visible";
        firstPage.style.visibility = "visible";
        firstNumber.style.backgroundColor = 'white';
    }
console.log(Math.ceil(coinsData.length / pagseSize));
    if (page == Math.ceil(coinsData.length / pagseSize)) {
        document.getElementById("next").style.visibility = "hidden";
        lastPage.style.visibility = "hidden";
        fifthNumber.style.backgroundColor = 'lightgray';
    }else {
        document.getElementById("next").style.visibility = "visible";
        fifthNumber.style.backgroundColor = 'white';
        lastPage.style.visibility = "visible";
    }

    if (page == 2){
        secondNumber.style.backgroundColor = 'lightgray';
    }else{
        secondNumber.style.backgroundColor = 'white';
    };

    if(page > 2 && page <= 8 ){
        thirdNumber.style.backgroundColor = 'lightgray';
    }else{
        thirdNumber.style.backgroundColor = 'white';
    };

    if(page == 9){
        fourthNumber.style.backgroundColor = 'lightgray';
    }else{
        fourthNumber.style.backgroundColor = 'white';
    }
    let ispis = "";




    coinsData.filter((elem, index) => {


        let start = (curPage - 1) * pagseSize;
        let end = curPage * pagseSize;
        if (index >= start && index < end) return true;
    }).forEach(coin => {


        ispis += `<tr> 
<td> ${coin.rank}</td>
<td>${coin.name} </td>
<td> ${coin.price}</td>
<td> ${coin.marketCap}</td>
<td>${coin.symbol}</td>
</tr>`

    })



    document.getElementById("data").innerHTML = ispis

}

rendertable()


document.getElementById("previous").addEventListener("click", previousPage)
document.getElementById("next").addEventListener("click", nextPage)



function nextPage() {
    let numberLastPage = parseInt(coinsData.length / pagseSize);
    
    if ((curPage * pagseSize) < coinsData.length) {
        curPage++;
        if(curPage > 3 && curPage < 8){
            firstNumber.innerHTML = curPage-2;
            secondNumber.innerHTML = curPage-1;
            thirdNumber.innerHTML = curPage;
            fourthNumber.innerHTML = curPage+1;
            fifthNumber.innerHTML = curPage+2;
        }
        if(curPage >=(numberLastPage-2)){
            firstNumber.innerHTML = numberLastPage-4;
            secondNumber.innerHTML = numberLastPage-3;
            thirdNumber.innerHTML = numberLastPage-2;
            fourthNumber.innerHTML = numberLastPage-1;
            fifthNumber.innerHTML = numberLastPage;
        }
        rendertable(curPage);
    }


}

function previousPage() {
    let numberLastPage = parseInt(coinsData.length / pagseSize);
    if (curPage > 1) {
        curPage--;
        if(curPage > 3 && curPage < (numberLastPage-2)){
            firstNumber.innerHTML = curPage-2;
            secondNumber.innerHTML = curPage-1;
            thirdNumber.innerHTML = curPage;
            fourthNumber.innerHTML = curPage+1;
            fifthNumber.innerHTML = curPage+2;
        }
        if(curPage <= 3){
            firstNumber.innerHTML = 1;
            secondNumber.innerHTML = 2;
            thirdNumber.innerHTML = 3;
            fourthNumber.innerHTML = 4;
            fifthNumber.innerHTML = 5;
        }
        
    }
    rendertable(curPage);
    }

let numberPaginacija = document.querySelectorAll('.number');

console.log(numberPaginacija);

numberPaginacija.forEach(elem=>{
    elem.addEventListener('click', paginacijaFnc)
})

function paginacijaFnc() {
    let numberLastPage = parseInt(coinsData.length / pagseSize);
    let number = this.innerHTML;
    curPage = parseInt(number);
    if(curPage<3){
        firstNumber.innerHTML = 1;
        secondNumber.innerHTML = 2;
        thirdNumber.innerHTML = 3;
        fourthNumber.innerHTML = 4;
        fifthNumber.innerHTML = 5;
    }else if(curPage>=(numberLastPage-2)){
        firstNumber.innerHTML = numberLastPage-4;
        secondNumber.innerHTML = numberLastPage-3;
        thirdNumber.innerHTML = numberLastPage-2;
        fourthNumber.innerHTML = numberLastPage-1;
        fifthNumber.innerHTML = numberLastPage;
    }else{
        firstNumber.innerHTML = curPage - 2;
        secondNumber.innerHTML = curPage - 1;
        thirdNumber.innerHTML = curPage;
        fourthNumber.innerHTML = curPage + 1;
        fifthNumber.innerHTML = curPage + 2;
    }
    rendertable(curPage);
}


firstPage.addEventListener('click',()=>{

curPage = 1 ;

        firstNumber.innerHTML = curPage;
        secondNumber.innerHTML = curPage + 1;
        thirdNumber.innerHTML = curPage + 2;
        fourthNumber.innerHTML = curPage + 3;
        fifthNumber.innerHTML = curPage + 4;

rendertable(curPage);
})


lastPage.addEventListener('click',()=>{

curPage = Math.ceil(coinsData.length / pagseSize);
        firstNumber.innerHTML = curPage - 4;
        secondNumber.innerHTML = curPage - 3;
        thirdNumber.innerHTML = curPage - 2;
        fourthNumber.innerHTML = curPage - 1;
        fifthNumber.innerHTML = curPage;

rendertable(curPage);
})