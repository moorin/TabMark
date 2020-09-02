// Tab > active Whether the tab is active in its window. Does not necessarily mean the window is focused.

// Tab > id The ID of the tab.

// Tab > index The zero-based index of the tab within its window.

// Tab > url The last committed URL of the main frame of the tab.

// index 0~len(tabs) 의 url을 가져와야한다.


function save_btn()
{
  alert("test");
}

window.onload = function()
{
  alert("1");
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
  });
  alert(url);
};