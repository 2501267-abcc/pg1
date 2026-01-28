let id = 1;
let count = 0;
let gameList = [];
function loadProcess(){
    if(localStorage != null){
        count = 0;
        id = 1;
        gameList = JSON.parse(localStorage.getItem("list"));
        let ul = document.getElementById("playList");
        ul.textContent = "";
        for(game of gameList){
            let li = document.createElement("li");
            li.id = id;
            let contentDiv = document.createElement("div");
            contentDiv.className = "item-content";
            let contentSpan = document.createElement("span");
            contentSpan.textContent = game.text;
            let timeP = document.createElement("p");
            timeP.style.fontSize = "0.8em";
            timeP.style.margin = 0;
            timeP.style.color = "blue";
            timeP.textContent = game.date;
            contentDiv.appendChild(contentSpan);
            contentDiv.appendChild(timeP);
            li.appendChild(contentDiv);
            let button = document.createElement("button");
            button.textContent = "削除";
            button.addEventListener("click",function(){             
                deleteList(li.id);
            })
            id += 1;
            count += 1;
            li.appendChild(button);
            ul.appendChild(li);
        }
        let countPtag = document.getElementById("count");
        countPtag.textContent = count + "件";
    }
}

function insertList(){
    let title = document.getElementById("title");
    let titleVal = title.value;
    let timeBox = document.getElementById("time");
    let timeVal = timeBox.value;
    if(titleVal != false && timeVal != false){
        let ul = document.getElementById("playList");
        let li = document.createElement("li");
        li.id = id;
        let text = "タイトル: " + titleVal + " プレイ時間: " + timeVal;
        let contentDiv = document.createElement("div");
        contentDiv.className = "item-content";
        let contentSpan = document.createElement("span");
        contentSpan.textContent = text;
        let time = new Date();
        let timeP = document.createElement("p");
        const year = String(time.getFullYear()).padStart(2,"0");
        const month = String((time.getMonth() + 1)).padStart(2,"0");
        const date = String(time.getDate()).padStart(2,"0");
        const hours = String(time.getHours()).padStart(2,"0");
        const minutes = String(time.getMinutes()).padStart(2,"0");
        const seconds = String(time.getSeconds()).padStart(2,"0");
        const timeText = year + "/" + month + "/" + date + "  " + hours  + ":" + minutes + ":" + seconds;
        timeP.textContent = timeText;
        timeP.style.fontSize = "0.8em";
        timeP.style.margin = 0;
        timeP.style.color = "blue";
        contentDiv.appendChild(contentSpan);
        contentDiv.appendChild(timeP);
        li.appendChild(contentDiv);
        let button = document.createElement("button");
        button.textContent = "削除";
        button.addEventListener("click",function(){
            deleteList(li.id);
        })
        id += 1;
        count += 1;
        li.appendChild(button);
        ul.appendChild(li);
        let gameData = {
            text: text,
            date: timeText
        };
        gameList.push(gameData);
        localStorage.setItem("list",JSON.stringify(gameList));
        title.value = "";
        timeBox.value = "";
        let countPtag = document.getElementById("count");
        countPtag.textContent = count + "件";
    }
    else if(titleVal == false){
        alert("タイトルが未入力です");
    }
    else if(timeVal == false){
        alert("プレイ時間が未入力です");
    }
}

function deleteList(id){
    let target = document.getElementById(id);
    target.textContent = "";
    let list =  JSON.parse(localStorage.getItem("list"));
    delete list[id-1];
    console.log(list);
    let gameList = list.filter(Boolean);
    localStorage.setItem("list",JSON.stringify(gameList));
    loadProcess();
}

window.onload = loadProcess;
