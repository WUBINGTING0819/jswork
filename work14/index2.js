let time = new Date()
let fenzhong = miao = 0;
fenzhong = 59 - time.getMinutes()
miao = 59 - time.getSeconds()
let id =setInterval(seckill,1000)
function seckill() {
    miao--
    if(miao== -1){
        miao= 59
        fenzhong--
    } 
    if(fenzhong == -1){
        fenzhong = 59
    } 
    document.getElementById('fenzhong').innerHTML = fenzhong +'分'
    document.getElementById('miao').innerHTML = miao +'秒'
}