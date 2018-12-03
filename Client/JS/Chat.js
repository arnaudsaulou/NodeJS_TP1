
//Verification du bon chargement de la page
$(document).ready(
    function () {

        var person = prompt("Enter votrepseudo");

        while (person == null) {
            person = prompt("Enter votrepseudo");
        }

        // Create WebSocket connection.
        var socket = new WebSocket("ws://127.0.0.1:8080/chat?pseudo='" + person + "'");

        // Connection opened
        socket.addEventListener('open', function (event) {
            console.log('Hello Server!');
        });

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        $("#chat_body").append(person + "<p> est maintenant connecté</p>");

    }
);