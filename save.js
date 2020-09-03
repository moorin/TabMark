//üũ�ڽ��� üũ�� url�� storage�� ����
//1. üũ�ڽ��� üũ�� url �ĺ�
//2. �ĺ��� url�� storage�� ����

function clickhandler(e){
    
    var storeURL = [];          //��ư ���� ������ �迭 �ʱ�ȭ
    var storeTitle = [];        //��ư ���� ������ �迭 �ʱ�ȭ
    var chkbox = document.querySelectorAll("#list input[type='checkbox']:checked"); //üũ�ڽ��� üũ�� �͵鸸 ��������

    chrome.storage.sync.get(['title', 'url'], function(result){         //storage�� ����Ǿ��ִ� ������ �ִٸ� strURL, strTitle�� ����
        if(typeof result.title === 'undefined'){
            console.log("get function returns null\n");
        }
        else{
            console.log("get storage in SAVE.js\n");
            for(var i=0; i<result.title.length; i++){
                storeURL.push(result.url[i]);             
                storeTitle.push(result.title[i]);
                console.log(result.title[i]+"\n");
            }
        }
        console.log("chkbox.length : "+chkbox.length);

        for(var i=0; i<chkbox.length; i++){                         //üũ�ڽ� üũ�� ������ŭ �ݺ�
                storeURL.push(listURL[chkbox[i].value]);                //������ ���� url�� �ӽù迭�� ����
                storeTitle.push(listTitle[chkbox[i].value]);            //������ ���� title�� �ӽù迭�� ����
        }


        chrome.storage.sync.set({'url': storeURL, 'title' : storeTitle},           //�������� �迭�� ũ�� storage�� ������ ���� url�� title ����
        function(){ 
            if(chrome.runtime.error){                       //����ó��
                console.log("Runtime Error.");
            }
            console.log("storeTitle length : "+storeTitle.length);
            console.log("set storage in SAVE.js\n"+storeTitle);
            });
    
        });
    }

    function clear(e){
        //storage�� �ִ� ��� ������ ����
        chrome.storage.sync.clear(function(){
            var error = chrome.runtime.lasterror;
            if(error){
                console.error(error);
            }
        });
    }
    
 


document.getElementById("save").addEventListener("click", clickhandler);            //�����ϱ� ��ư�� ������ �̺�Ʈ ����
document.getElementById("clear").addEventListener("click", clear);


