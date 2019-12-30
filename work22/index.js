var jms = null
var timeHandle = null;
var xmlhttp=new XMLHttpRequest()
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        try{
            let ajaxData=JSON.parse(xmlhttp.responseText)
            result = ajaxData.map((val,index)=>{return index+1+":"+val.name+"--"+val.score})
            result = '排行榜\n'+result.join(String.fromCharCode(13))
            alert(result)
        }catch(e){
            console.log(e)
        }
    }
}