//storage�� ����Ǿ� �ִ� ���� �ҷ��ͼ� �������� ��� ���
chrome.storage.sync.get(['title', 'url'], function(result){
    for(var i=0; i<result.title.length; i++){               //storage�� ����� title�� ������ŭ �ݺ�
        document.querySelector('#list').innerHTML +=        //���� ������ list ������ HTML ����
        "<h3>"+result.title[i]+"</h3>"+result.url[i]+"<br/>";   //storage�� ����� title�� url ���
    }
});