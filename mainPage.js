function newhandler(e){                                 //��ư ������ �̺�Ʈ �ڵ鷯 ����
    chrome.tabs.create({url : "./mainPage.html"});      //���� �������� �̵�
}

document.getElementById("main_page").addEventListener("click", newhandler);     //'���� �������� �̵�' ��ư�� �̺�Ʈ ������ ���