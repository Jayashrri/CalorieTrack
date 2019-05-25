const Name = document.querySelector('.Name');
const Food = document.querySelector('.Food');
const Fats = document.querySelector('.Fats');
const Carbs = document.querySelector('.Carbs');
const Proteins = document.querySelector('.Proteins');

const submitvalue = document.getElementById('submitvalue');
const logging = document.querySelector('.logging');
const addfood = document.getElementById('addfood');
const showtotalcal = document.getElementById('showtotalcal');

const age = document.querySelector('.age');
const height = document.querySelector('.height');
const weight = document.querySelector('.weight');

const fooddisparea = document.getElementById('fooddisparea');

let getval;
let i;
let para;
let node;

let users = [];
let calval = [];
let reqval = [];
let uindex;
let fooddb=[];
let dateofentry;


function calccal(){
    let fatval = Fats.value;
    let carbval = Carbs.value;
    let protval = Proteins.value;
    let totalcal = (protval/20*4)+(carbval/35*4)+(fatval/15*9);
    totalcal=Math.round(totalcal);
    let foodeaten = Food.value+'$'+fatval+'$'+carbval+'$'+protval+'$'+totalcal;
    fooddb[uindex].push(foodeaten);
    let temp = parseInt(calval[uindex]);
    temp+=totalcal;
    calval[uindex]=temp;
    populateStorage();
    document.getElementById('inpform').reset();
    dispfoods();
}

function showcal(){
    window.alert("Total Calories Consumed: "+calval[uindex]+"\nDaily Calorie Limit: "+reqval[uindex]);
    if(calval[uindex]>reqval[uindex]){
        window.alert("Daily Calorie Limit Exceeded!");
    }
}


function dispfoods(){
    fooddisparea.innerHTML="";
    document.getElementById('foodname').style.display="none";
    document.getElementById('nutrvalue').style.display="none";
    for(i=0;i<fooddb[uindex].length;i++){
        getval=fooddb[uindex][i].split('$');
        para=document.createElement("p");
        node=document.createTextNode(getval[0]);
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createTextNode("Fats: "+getval[1]+"g");
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createTextNode("Carbohydrates: "+getval[2]+"g");
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createTextNode("Proteins: "+getval[3]+"g");
        para.appendChild(node);
        node=document.createElement("br");
        para.appendChild(node);
        node=document.createTextNode("Total Calories: "+getval[4]+"cal");
        para.appendChild(node);
        fooddisparea.appendChild(para);
    }
    logging.style.display="block";
    logging.value="Logout";
    submitvalue.style.display="none";
    addfood.style.display="block";
    showtotalcal.style.display="block";

    logging.onclick=function(){
        document.getElementById('udets').style.display="none";
        document.getElementById('nutrvalue').style.display="none";
        document.getElementById('foodname').style.display="none";
        fooddisparea.textContent="";
        Name.disabled = false;
        Name.value="";
        submitvalue.style.display="none";
        addfood.style.display="none";
        addfood.style.display="none";
        showtotalcal.style.display="none";
        logging.value="Login";
        logging.onclick=uidlogin;
    }
    
    addfood.onclick=function(){
        submitvalue.style.display="block";
        addfood.style.display="none";
        showtotalcal.style.display="none";
        document.getElementById('foodname').style.display="block";
        document.getElementById('nutrvalue').style.display="block";
        submitvalue.onclick=calccal;
    }
}


function uidlogin(){
    document.getElementById('inpform').style.display="block";
    logging.style.display="none";
    uindex = users.indexOf(Name.value);
    Name.disabled = true;
    if(uindex===-1){
        users.push(Name.value);
        calval.push(0);
        reqval.push(0);
        fooddb.push([]);
        uindex = users.length - 1;
        document.getElementById('udets').style.display="block";
        submitvalue.style.display="block";
        submitvalue.onclick=function(){
            let A = age.value;
            let H = height.value;
            let W = weight.value;
            reqval[uindex]=(10*W) + (6.25*H) - (5*A) + 5;
            document.getElementById('udets').style.display="none";
            dispfoods();
        };
    }
    else{
        document.getElementById('udets').style.display="none";
        dispfoods();
    }
}


function populateStorage(){
    getval=users.join(',');
    localStorage.setItem('userids',getval);
    getval=calval.join(',');
    localStorage.setItem('calorievals',getval);
    getval=reqval.join(',');
    localStorage.setItem('requiredval',getval);
    for(i=0;i<fooddb.length;i++){
        getval=fooddb[i].join(',');
        localStorage.setItem('fooddb'+i,getval);
    }
    localStorage.setItem('dateofentry',dateofentry);
}


function setValues(){
    getval=localStorage.getItem('userids');
    users=getval.split(',');
    getval=localStorage.getItem('calorievals');
    calval=getval.split(',');
    getval=localStorage.getItem('requiredval');
    reqval=getval.split(',');
    for(i=0;localStorage.getItem('fooddb'+i);i++){
        getval=localStorage.getItem('fooddb'+i);
        getval=getval.split(',');
        fooddb.push(getval);
    }
    dateofentry=localStorage.setItem('dateofentry');
}

document.getElementById('udets').style.display="none";
document.getElementById('nutrvalue').style.display="none";
document.getElementById('foodname').style.display="none";
submitvalue.style.display="none";
addfood.style.display="none";
showtotalcal.style.display="none";
document.getElementById('inpform').style.display="none";
Name.value="";

if(localStorage.getItem('userids')) setValues();

let today = new Date();
currentdate=today.getDate+'/'+(today.getMonth+1)+'/'+today.getFullYear;

if(currentdate!=dateofentry){
    calval.fill(0);
    fooddb.fill([]);
    dateofentry=currentdate;
}

logging.onclick=uidlogin;
