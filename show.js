//storage�� ����Ǿ� �ִ� ���� �ҷ��ͼ� �������� ��� ���
chrome.storage.sync.get(['title', 'url'], function(result){
    console.log("get storage in SHOW.js : "+result.title);
    for(var i=0; i<result.title.length; i++){               //storage�� ����� title�� ������ŭ �ݺ�
        document.querySelector('#list').innerHTML +=        //���� ������ list ������ HTML ����
        "<h3>"+result.title[i]+"</h3>"+result.url[i]+"<br/>";   //storage�� ����� title�� url ���
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