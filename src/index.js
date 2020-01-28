import '../assets/index.css';

function initialize() {
    var searchbtn = document.getElementById("search_btn");
    if(searchbtn) {
        searchbtn.addEventListener("click", searchBtnClick);
    }
}

function searchBtnClick (e) {
    deleteAllRow();
    LoadRealty();
}

function deleteAllRow() {
    var tbody = document.getElementById('result_body');
    var totCnt = tbody.childElementCount;
    for(var i=0; i<totCnt; i++) {
        tbody.deleteRow(0); // 하단부터 삭제
    }
}

function addRow(seq, children) {
    var arrChild = Array.from(children.children);
    var tbody = document.getElementById('result_body');
    var tr = document.createElement("tr");
    var result;

    var td1 = document.createElement("td");
    td1.innerText = seq;
    var td2 = document.createElement("td");
    result = arrChild.filter(function(e) {
        return e.nodeName === "아파트";
    });
    if(result.length > 0) {
        td2.innerText = result[0].innerHTML.trim();
    }
    
    var td3 = document.createElement("td");
    result = arrChild.filter(function(e) {
        return e.nodeName === "거래금액";
    });
    if(result.length > 0) {
        td3.innerText = result[0].innerHTML.trim();
    }

    var td4 = document.createElement("td");
    result = arrChild.filter(function(e) {
        return e.nodeName === "건축년도";
    });
    if(result.length > 0) {
        td4.innerText = result[0].innerHTML.trim();
    }

    var td5 = document.createElement("td");
    result = arrChild.filter(function(e) {
        return e.nodeName === "전용면적";
    });
    if(result.length > 0) {
        td5.innerText = result[0].innerHTML.trim();
    }
    
    var td6 = document.createElement("td");
    result = arrChild.filter(function(e) {
        return e.nodeName === "층";
    });
    if(result.length > 0) {
        td6.innerText = result[0].innerHTML.trim() + '층';
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbody.appendChild(tr);
}

function LoadRealty() {
    var xhr = new XMLHttpRequest();
    var parser, xmlDoc, children;
    var seq = 0;
    
    xhr.open("POST", "/api/call");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.responseText,"text/xml");
            children = xmlDoc.getElementsByTagName('body')[0].firstElementChild;
            
            for(var i=0; i < children.childElementCount; i++) {
                addRow(++seq, children.children[i]);
            }
        }
    };
    xhr.send(JSON.stringify({ 
        "serviceKey": "o9cN%2F0w8po32sX1zOEKmo%2BsF%2BQijO6CcaLZmCAcVj45SuyHOPoCCrYbIbjE33hcAN5%2B649xyJV7%2B7ZH8T8PFTA%3D%3D",
        "pageNo": "1",
        "numOfRows": "1000",
        "LAWD_CD": "11710",
        "DEAL_YMD": "201512",
        }));
}

initialize();
LoadRealty();