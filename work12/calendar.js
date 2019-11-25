function calendar(y){
    var w = new Date(y,0).getDay();

    var html = '<div class="box">';
    
    for(var m = 1;m<=12;++m){
        html +='<table>'
        html +='<tr class="title"><th colspan"7">'+y+'年'+m+'月</th></tr>';
        html +='<tr><td>日</tr><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';

        var mar = new Date(y,m,0).getDate();
        
    }
}