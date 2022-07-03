var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}


function makeAJAXCall(methodType,url,callback,async=true,data=null)
{

    let xhr= new XMLHttpRequest();
   
    xhr.onreadystatechange= function(){
       
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
                
                callback(xhr.responseText);
            }
           
            else if(xhr.status>=400)
            {
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
        xhr.open(methodType,url,async);
        
        if(data)
        {
          
            xhr.setRequestHeader("Content-Type","application/json");
          
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
    
    
    console.log(methodType+" Request sent to the server at: "+showTime());
}

function getUserDetails(data)
{
    console.log("Get User Data at"+showTime()+" Values "+data);
}


const getURL=   "http://localhost:3000/employees/";
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX call to server at: "+showTime());


const deleteURL="http://localhost:3000/employees/4";

function userDeleted(data)
{
    console.log("User Deleted: "+data);
}

makeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("Made DELETE AJAX call to server at: "+showTime());

const postURL= "http://localhost:3000/employees";

const emplData= {"name":"Kretika","salary":"680000"};
function userAdded(data)
{
    console.log("User Added: "+data);
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);
console.log("Made POST AJAX call to server at: "+showTime());