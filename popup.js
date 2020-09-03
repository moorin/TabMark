var allTabTitles = [];


function save(curruentTabTitle){
  
  // 저장하기
  chrome.storage.sync.set({'title': curruentTabTitle}, function() {
      console.log('Value is set to ' + curruentTabTitle);
      console.log(curruentTabTitle);
        });
    
    chrome.storage.sync.get(['title'], function(result) {
      //console.log('Value currently is ' + result.title);
  });
}


// 현재 윈도우의 모든 탭의 url 가져오기
function getUrlAndTitle(saveData){
  
  chrome.windows.getAll({populate:true}, function(window_list){
    
    var currnetWindowTabTitles = [];
    for(var i=0; i<window_list.length; i++){
      for(var j=0; j<window_list[i].tabs.length; j++){

        currnetWindowTabTitles.push(window_list[i].tabs[j].title);
        //console.log(window_list[i].tabs[j].url, window_list[i].tabs[j].title);
        
        if(saveData == false)
        {
          // html 태그 만들기
          var newLi = document.createElement("li");
          var newInput = document.createElement("input");
          var newSpan = document.createElement("span");
          newInput.type = "checkbox"
          newSpan.className = "tab_title";
          var spanText = document.createTextNode(window_list[i].tabs[j].title);
          newSpan.appendChild(spanText);
          //console.log(newSpan);

          document.getElementById("tab_titles").appendChild(newLi);
          newLi.appendChild(newInput); newLi.appendChild(newSpan);
        }
      }
    }
    if(saveData == true)
    {
        save(currnetWindowTabTitles);
    }
    allTabTitles.push(currnetWindowTabTitles);
    console.log(allTabTitles);
    
  });
}


window.onload = function()
{
  // 새로고침 버튼 만들어야할 듯
  getUrlAndTitle(false);
                        
  document.getElementsByClassName("popup_save")[0].addEventListener('click', function(){getUrlAndTitle(true);},false);
 
};