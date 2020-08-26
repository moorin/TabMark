var listURL = [];
var listTitle = [];

//현재 윈도우에 열려있는 탭 정보(url, title) 가져오기
chrome.windows.getAll({     //getAll()로 모든 윈도우에 대한 정보 가져옴
    populate : true
}, function(window_list){
    var numWindows = window_list.length;

    for(var i=0; i<numWindows; i++){
        for(var j=0; j<window_list[i].tabs.length; j++){
            document.querySelector('#list').innerHTML += window_list[i].tabs[j].title+"<br/><hr width='330; color='#A4A4A4>'";  //탭의 타이틀로 목록 구성
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //열려있는 탭의 URL 저장
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //열려있는 탭의 title 저장
        }
        
    }
});
