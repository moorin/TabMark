/*
저장을 어떻게 할 것인가?
폴더 구조, tree? log(n), list? -> 찾을 때 시간 걸림
개수는 대충? 0.5초 기준으로 1~10만개
일단 list로 만들고 나중에 tree로 변경

저장한 날짜, 시간 > 저장할 이름 > 탭 제목들
*/

// 저장하기
function save(curruentTabTitle) {
  //그냥 저장
    chrome.storage.sync.set({ title: curruentTabTitle }, function () {
        console.log("Value is set to " + curruentTabTitle);
        //console.log(curruentTabTitle);
    });

  //변경할 때
/*
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue, //이전값
                    storageChange.newValue);//변경된값
        }
    });
    */

  //저장한 데이터 꺼내와서 확인하기

    chrome.storage.sync.get("title", function (items) {
        // items: 저장한 객체의 key/value
        var newDiv = document.createElement("div");
        newDiv.className = "save_item";
        document.getElementById("save_list").appendChild(newDiv);

        for (var i = 0; i < items["title"].length; i++) {
        //저장한 파일을 tabmark.html의 <div class="save_list"></div>에 div(index) > li 형태로 띄워주기
        // html 태그 만들기
        // tabmark.html에 추가해야되니까 tabmark.js에 이 코드를 작성해야하고 그러면 변수값을 tabmark.js로 옮겨줘야한다.

            var newLi = document.createElement("li");
            var newSpan = document.createElement("span");

            var spanText = document.createTextNode(items["title"][i]);
            newSpan.appendChild(spanText);
        //console.log(newSpan);

            document.getElementById("save_item").appendChild(newLi);
            newLi.appendChild(newInput);
            newLi.appendChild(newSpan);

            console.log(items["title"][i]);
        }
    });
}
