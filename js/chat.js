window.onload = initialize;

var db;

function initialize(){
    db = firebase.database();
    showAllMessages();

    document.getElementById("form-message").addEventListener("submit", sendMessage);
}

function sendMessage(e){
    e.preventDefault();

    let refMessages = db.ref("messages");
    refMessages.push({
        name: e.target.name.value,
        message: e.target.message.value
    });
}

function showAllMessages(){
    let refMessages = db.ref("messages");

    refMessages.on("value", snap => {
        let data = snap.val();
        let allMessages = "";
        for (var key in data){
            allMessages += "<span class=\"username\">" + data[key].name + " dice: </span>" + data[key].message + "</br>";
        }
        document.getElementById("all-messages").innerHTML = allMessages;
    });
}