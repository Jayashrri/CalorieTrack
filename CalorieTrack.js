const Name = document.querySelector('.Name');
const Food = document.querySelector('.Food');
const Fats = document.querySelector('.Fats');
const Carbs = document.querySelector('.Carbs');
const Proteins = document.querySelector('.Proteins');
const submitvalue = document.querySelector('.submitvalue');
const logging = document.querySelector('.logging');
const age = document.querySelector('.age');
const height = document.querySelector('.height');
const weight = document.querySelector('.weight');

const cumcalories = document.querySelector('.cumcalories');
const disptotal = document.querySelector('.disptotal');

let getval;
let users = [];
let calval = [];
let reqval = [];
let uindex;

function calccal(){
    let fatval = Fats.value;
    let carbval = Carbs.value;
    let protval = Proteins.value;
    let totalcal = (protval/20*4)+(carbval/35*4)+(fatval/15*9);
    let temp = parseInt(calval[uindex]);
    temp+=totalcal;
    calval[uindex]=temp;
    disptotal.textContent = "Total Calories Consumed: ";
    cumcalories.textContent = calval[uindex];
    if(calval[uindex]>reqval[uindex])
        window.alert("Daily Calorie Intake Limit Exceeded!");
    logging.style.display="block";
    logging.value="Logout";
    populateStorage();
    document.getElementById('inpform').reset();
    logging.onclick=function(){
        document.getElementById('udets').style.display="none";
        document.getElementById('nutrvalue').style.display="none";
        document.getElementById('foodname').style.display="none";
        document.getElementById('submitvalue').style.display="none";
        cumcalories.textContent="";
        disptotal.textContent="";
        Name.disabled = false;
        Name.value="";
        logging.value="Login";
        logging.onclick=uidlogin;
    };
    submitvalue.onclick=calccal;
}

function uidlogin(){
    logging.style.display="none";
    uindex = users.indexOf(Name.value);
    Name.disabled = true;
    if(uindex===-1){
        users.push(Name.value);
        calval.push(0);
        reqval.push(0);
        uindex = users.length - 1;
    };
    document.getElementById('udets').style.display="block";
    submitvalue.style.display="block";
    submitvalue.onclick=function(){
        let A = age.value;
        let H = height.value;
        let W = weight.value;
        reqval[uindex]=(10*W) + (6.25*H) - (5*A) + 5;
        document.getElementById('foodname').style.display="block";
        document.getElementById('nutrvalue').style.display="block";
        document.getElementById('udets').style.display="none";
        submitvalue.onclick=calccal;
    };
}

function populateStorage(){
    getval=users.join(',');
    localStorage.setItem('userids',getval);
    getval=calval.join(',');
    localStorage.setItem('calorievals',getval);
    getval=reqval.join(',');
    localStorage.setItem('requiredval',getval);
}

function setValues(){
    getval=localStorage.getItem('userids');
    users=getval.split(',');
    getval=localStorage.getItem('calorievals');
    calval=getval.split(',');
    getval=localStorage.getItem('requiredval');
    reqval=getval.split(',');
}

document.getElementById('udets').style.display="none";
document.getElementById('nutrvalue').style.display="none";
document.getElementById('foodname').style.display="none";
submitvalue.style.display="none";
Name.value="";

if(localStorage.getItem('userids')) setValues();

logging.onclick=uidlogin;
