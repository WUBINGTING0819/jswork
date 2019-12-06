let time = new Date()
let fenzhong = miao = 0;
fenzhong = 60 - time.getMinutes()
miao = 60 - time.getSeconds()
let id =setInterval(seckill,1000)
function seckill() {
    miao--
    if(miao== -1){
        miao= 60
        fenzhong--
    } 
    if(fenzhong == -1){
        fenzhong = 60
    } 
    document.getElementById('fenzhong').innerHTML = fenzhong +'分'
    document.getElementById('miao').innerHTML = miao +'秒'
}