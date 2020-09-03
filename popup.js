var listURL = [];
var listTitle = [];

//현재 윈도우에 열려있는 탭 정보(url, title) 가져오기
chrome.windows.getAll({     //getAll()로 모든 윈도우에 대한 정보 가져옴
    populate : true
}, function(window_list){
    numWindows = window_list.length;            //console.log로 찍어보면 1개 나옴
    var str;
    var count=0;            //윈도우 상관없이 열려있는 모든 탭의 개수를 저장할 변수

    for(var i=0; i<numWindows; i++){                                               //열려있는 window의 개수
        for(var j=0; j<window_list[i].tabs.length; j++){                           //windows_list[i].tabs.length = 오픈되어 있는 탭의 개수
            count++;
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //열려있는 탭의 URL 저장
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //열려있는 탭의 title 저장            
        }
    }

    for(i=0; i<count; i++){
        str = replace_for(listTitle[i]);                                        //텍스트로 된 탭의 title
        document.querySelector('#list').innerHTML +=
        "<input type='checkbox' name='check' value="+i+" checked/>"             //체크박스 생성
        +str+"<br/>";
    }
});

//html 태그를 텍스트로 변환하는 함수
function replace_for(str){
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;")
}
