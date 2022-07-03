const { resolve } = require("path");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}


function makePromiseCall(methodType,url,async=true,data=null)
{

    return new Promise(function(resolve,reject){

    let xhr= new XMLHttpRequest();
    

    xhr.onreadystatechange= function(){
       
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
               resolve(xhr.responseText);
            }
           
            else if(xhr.status>=400)
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("Xhr failed");
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
    });
}

const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("Get User data: "+responseText);
    })
    .catch(error=>console.log("Get error status: "+JSON.stringify(error)))


const deleteURL="http://localhost:3000/employees/5";

makePromiseCall("DELETE",deleteURL,false)
    .then(responseText=>console.log("User Deleted: "+responseText))
    .catch(error=>console.log("DELETE Error Status: "+JSON.stringify(error)))


const postURL= "http://localhost:3000/employees";

const emplData= {"name":"Kretika","salary":"680000"};

makePromiseCall("POST",postURL,true,emplData)
    .then(responseText=>console.log("User added: "+responseText))
    .catch(error=>console.log("POST error status: "+error))