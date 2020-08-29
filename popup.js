var listURL = [];
var listTitle = [];

//현재 윈도우에 열려있는 탭 정보(url, title) 가져오기
chrome.windows.getAll({     //getAll()로 모든 윈도우에 대한 정보 가져옴
    populate : true
}, function(window_list){
    var numWindows = window_list.length;            //console.log로 찍어보면 1개 나옴
    var str;

    for(var i=0; i<numWindows; i++){                      
        for(var j=0; j<window_list[i].tabs.length; j++){                        //windows_list[i].tabs.length = 오픈되어 있는 탭의 개수
            str = replace_for(window_list[i].tabs[j].title);                    //Title에 들어있는 html 태그를 텍스트로 변환
            document.querySelector('#list').innerHTML +=
            "<input type='checkbox' name='check' value="+j+" checked/>"         //체크박스 생성(체크상태)
            +str                                                                //텍스트로 된 탭의 title
            +"<br/><hr width='330'; color='#A4A4A4>'";                          //줄바꿈+구분선
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //열려있는 탭의 URL 저장
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //열려있는 탭의 title 저장
        }
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
