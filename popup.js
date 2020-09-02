// Tab > active Whether the tab is active in its window. Does not necessarily mean the window is focused.

// Tab > id The ID of the tab.

// Tab > index The zero-based index of the tab within its window.

// Tab > url The last committed URL of the main frame of the tab.

// index 0~len(tabs) 의 url을 가져와야한다.


function save(btn_click)
{
  console.log("test");
  btn_click.onclick=function()
  {
    console.log("clicked!");
  };
}

window.onload = function()
{
  
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //lastFocusedWindow: true 이기 때문에 tabs[0]은 마지막 탭
    
    let url = tabs[0].url;
    let id = tabs[0].id;
    let index = tabs[0].index;
    let oldindex = index;
    console.log(url,id,index);
    
    
    chrome.tabs.goBack(); // 뒤로 이동
    console.log(tabs[0].length);
  });
  
  
  var btn_save = document.getElementsByClassName("popup_save")[0];
  save(btn_save);
  
  
};