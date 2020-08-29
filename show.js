//storage에 저장되어 있는 내용 불러와서 페이지에 목록 출력
chrome.storage.sync.get(['title', 'url'], function(result){
    for(var i=0; i<result.title.length; i++){               //storage에 저장된 title의 개수만큼 반복
        document.querySelector('#list').innerHTML +=        //메인 페이지 list 영역에 HTML 삽입
        "<h3>"+result.title[i]+"</h3>"+result.url[i]+"<br/>";   //storage에 저장된 title과 url 출력
    }
});