var url = window.location.href;

var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/assets/";
var qs = url.split('/');
var pathName = '';
console.log(qs);
if(qs[6]){
    if(qs[6] == 'login' || qs['6'] == 'register'){
        pathName = 'authentication';
    }else {
        pathName = qs[6];
    }
}else {
    pathName = 'home';
}
var style = document.createElement('link');
style.rel = 'stylesheet';
style.href = baseUrl+'template/site/'+pathName+'/'+pathName+'.css';
document.head.appendChild(style);