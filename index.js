import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoplist-a7620-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "msgList")

// console.log(app)

const inputel = document.getElementById("input-field")
const btn = document.getElementById("send")
const msgListEl = document.getElementById("msg-list")

btn.addEventListener("click", function() {
    let ele = inputel.value;
    if(ele.length) push(listInDB, ele)    

    clearInputFieldEl()

    // appendItemToMsgListEl(ele)
})

onValue(listInDB, function(snapshot) {
    if(snapshot.exists()) {
        let listArray = Object.entries(snapshot.val())
        clearMsgListEl()
    
        for(let item in listArray) {
            appendItemToMsgListEl(listArray[item])
        }
    }
    else {
        msgListEl.innerHTML = "No items.... yet"
    }
})



function clearMsgListEl() {
    msgListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputel.value = ""
}

function appendItemToMsgListEl(item) {
    // MsgListEl.innerHTML += `<li>${ele}</li>`
    let newEl = document.createElement("li")

    let currentId = item[0]
    let currentItem = item[1]
    newEl.textContent = currentItem
    
    newEl.addEventListener('click', function() {
        let exactLoactioninDB = ref(database, `shopList/${currentId}`)
        console.log(currentId)
        remove(exactLoactioninDB)
    })

    msgListEl.append(newEl)
    // MsgListEl.insertBefore(newEl, msgListEl.children[0]);

    window.scrollTo(0, document.body.scrollHeight);
}