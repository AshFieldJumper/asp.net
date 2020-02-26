"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => messageHandler(user, message));

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", event => sendMessage(event));
document.getElementById("messageInput").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        sendMessage(event);
    }
});
function sendMessage(event) {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value;
    if (message != "") {
        connection.invoke("SendMessage", message).catch(function (err) {
            return console.error(err.toString());
        });
        messageInput.value = "";
        messageInput.focus();
    }else
        alert("Je kan niet niets sturen.");
    event.preventDefault();
}

function messageHandler(user, message) {
    var messages = $("#messagesList");
    let data;
    var d = new Date();
    let date = d.getHours() + ":"+  d.getMinutes();

    if (username == user)
        data = appendOutgoing(message, date);
    else
        data = appendIncomming(message, date);

    messages.html(messages.html() + data);
}

function appendOutgoing(message, date) {
    return '<div class="outgoing_msg">\n' +
        '<div class="sent_msg">\n' +
        '<p>' + message + '</p>\n' +
        '<span class="time_date">' + date + ' | Today</span> </div>\n' +
        '</div>'
}

function appendIncomming(message, date) {
    return '<div class="incoming_msg">\n' +
        '       <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>\n' +
        '       <div class="received_msg">\n' +
        '           <div class="received_withd_msg">\n' +
        '               <p>' + message + '</p>\n' +
        '               <span class="time_date">' + date + ' | Today</span></div>\n' +
        '       </div>\n' +
        '   </div>';
}