// variables 
//buttons
const getLoanButton =document.getElementById("get-loan-button")
const bankButton =document.getElementById("bank-button")
const workButton =document.getElementById("work-button")
const buyNowButton =document.getElementById("buy-now-button")
const payLoanButton =document.getElementById("pay-loan-button")
//values
const workMoney = document.getElementById("work-money")
const balanceMoney = document.getElementById("balance-money")
const currentLoan = document.getElementById("current-loan")
const outstandingLoan = document.getElementById("outstanding-loan")
const laptopsElement = document.getElementById("laptops")
const discriptionElement = document.getElementById("discription")
const imageElement = document.getElementById("image")
const featureElement = document.getElementById("features")
const priceElement = document.getElementById("price")
//variables initialzed
var valueWork =0
var balance =0
var loan = 0
let laptops=[]
workMoney.innerHTML=new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    valueWork)  //set initial display
  
balanceMoney.innerHTML =new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    balance) // set initial display


fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptops(laptops))

const addLaptops = (laptops) => {
    laptops.forEach(x => addLaptop(x))
}

const addLaptop = (laptop) => {
    const laptopElement = document.createElement("option")
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement)
}

const handleFeatureChange = e =>{
    const selectedLaptop = laptops[e.target.selectedIndex]
    discriptionElement.innerText =selectedLaptop.description  //description
    let url="https://hickory-quilled-actress.glitch.me/"   +selectedLaptop.image //image url
    imageElement.src = url //image
    featureElement.innerHTML = `<ul>${selectedLaptop.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>`
    priceElement.innerHTML =new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
        selectedLaptop.price)

}



//currentLoan.innerHTML=""
  
//***-----functions-------***
function add100func(){
    valueWork +=100   // adds 100 every time the function is called
    workMoney.innerHTML=new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
        valueWork)
}


function bankFunction(){
    balance = Number(balanceMoney.innerHTML.replace(",00","").match(/\d+/g).join('')) //get the value of balance
    valueWork = Number(workMoney.innerHTML.replace(",00","").match(/\d+/g).join(''))      // get the value of work money                                                                           //beacuse it is decimal we need to replace decimals with blank
    
    //check if ther is loan or not if there is all work money goes to balance else 0.9 work money goes to balance rest in loan
    if(loan == 0){
    var updatedBalance =  balance + valueWork   //new updated balance                                                                                
    }else if(loan!=0){
         updatedBalance = balance +0.9*valueWork
        currentLoan.innerHTML -=0.1*valueWork // pay 10%in tthe loan
        
    }
 
    balanceMoney.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format( //set the new balance
     (updatedBalance)) 
      
    valueWork =0 // set work money to zero
    workMoney.innerHTML= new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    valueWork) //set work money dispaly to 0  
}

function getLoanFunc(){
    var curretnBalance =Number(balanceMoney.innerHTML.replace(",00","").match(/\d+/g).join('')) //get curent balance
    if(loan!=0){
        alert("Please pay out your existing loan before demanding a new one")
    }else{
        let loanDemand = prompt("Please enter the amount of the loan you wish: ")
            if(parseInt(loanDemand) >2*curretnBalance){
                alert("Your loan cannot be greater then twice the amount of balance")
        } else{
            alert("You are given a "+loanDemand+" euro loan")
            loan=loanDemand // set loanvalue
            currentLoan.innerHTML=loan
            hideAndSeekElements()
            //add loan to balance
            balanceMoney.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format( 
    (curretnBalance + Number(loan))) 
            
        }   
        
}
}

function hideAndSeekElements(){    //function to hide and reveal elements with loan
    if(loan!=0){
        document.getElementById("pay-loan-button").style.display = "inline-block";
        document.getElementById("outstanding-loan").style.display = "block";
        document.getElementById("current-loan").style.display = "block";

    }else{
        alert("loan is paid")
        document.getElementById("pay-loan-button").style.display = "none";
        document.getElementById("outstanding-loan").style.display = "none";
        document.getElementById("current-loan").style.display = "none";

    }

}

function payLoan(){
    let currentWorkMoney = Number(workMoney.innerHTML.replace(",00","").match(/\d+/g).join(''))
    
    //if work money is less than loan all work money goers to loan payment and work money set ot zero
    //also call the hide n seek method to check if the loan is paid
    if(currentWorkMoney<=loan){
        loan = loan - currentWorkMoney
        currentLoan.innerHTML=loan + " euros"
        workMoney.innerHTML= new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
            0)
            hideAndSeekElements()
    // if work money is greater than loan we zero the loan and subtract it from work money        
    }else if(currentWorkMoney>loan){
        workMoney.innerHTML= new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
            currentWorkMoney - loan)
        loan=0
        currentLoan.innerHTML=loan + " euros"
        hideAndSeekElements()
        
    }
 }


 function buyFunc(){
    let curretnBalance =Number(balanceMoney.innerHTML.replace(",00","").match(/\d+/g).join('')) //get curent balance
    let price = Number(priceElement.innerHTML.replace(",00","").match(/\d+/g).join(''))         //get price of pc

    if(price<=curretnBalance){
        alert("Congatulations!! You just bought your self a nice Computer")
        balanceMoney.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format( //set the new balance
        (curretnBalance-price)) // retract the price tof laptop form balnce
        alert("Reamining balance: "+ balanceMoney.innerHTML.replace(",00","").match(/\d+/g).join('')+" euros")
    }else{
        alert("Sorry you dont have enough funds to buy this computer..... Maybe try a less expensive")
    }
   
 }


//event listeners
workButton.addEventListener("click", add100func)
bankButton.addEventListener("click", bankFunction)
getLoanButton.addEventListener("click", getLoanFunc)
payLoanButton.addEventListener("click", payLoan)
laptopsElement.addEventListener("change", handleFeatureChange)
buyNowButton.addEventListener("click", buyFunc)

