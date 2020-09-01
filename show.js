//storage에 저장되어 있는 내용 불러와서 페이지에 목록 출력
chrome.storage.sync.get(['title', 'url'], function(result){
    console.log("get storage in SHOW.js : "+result.title);
    for(var i=0; i<result.title.length; i++){               //storage에 저장된 title의 개수만큼 반복
        document.querySelector('#list').innerHTML +=        //메인 페이지 list 영역에 HTML 삽입
        "<h3>"+result.title[i]+"</h3>"+result.url[i]+"<br/>";   //storage에 저장된 title과 url 출력
    }
});

chrome.storage.onChanged.addListener(function(changes){
    console.log("inside onChanged\n");
    var titleStorage = changes['title'];
    var urlStorage = changes['url'];
    console.log(titleStorage);
    console.log("titleStorage.newValue.length : "+titleStorage.newValue.length);
    for(var i=0; i<titleStorage.newValue.length; i++){
        document.querySelector('#list').innerHTML +=
        "<h3>"+titleStorage.newValue[i]+"</h3>"+urlStorage.newValue[i]+"<br/>";
    }
    chrome.storage.sync.get(['title', 'url'], function(result){
        console.log("storage in Listener : "+result.title);
    })
});