let sName=document.getElementById("sname");
let aName=document.getElementById("aname");
let sPath=document.getElementById("spath");
let add=document.getElementById("add");


add.addEventListener("click",(e)=>{

    e.preventDefault();
    if(sName.value !='' && aName.value !='' && sPath.value !=''){
        let newData={
            songname:sName.Value,
            Artist:aName.Value,
            Path:sPath.Value
        };

        let myData=localStorage.getItem("songDatas") ? JSON.parse(localStorage.getItem("songDatas")):[];
        myData.push(newData);
        localStorage.setItem("songDatas",JSON.stringify(myData));
    }
    else{
        alert("Fill all input Data.")
    }

    sName.value = '';
    aName.value = '';
    sPath.value = '';
})



