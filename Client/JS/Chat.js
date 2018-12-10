//Verification du bon chargement de la page
$(document).ready(
    function () {

        console.log();

        //Capture du pseudo
        if(document.cookie != ""){
            person = document.cookie;
        }else {
            var person = prompt("Enter votrepseudo");
            while (person == null) {
                person = prompt("Enter votrepseudo");
            }
            document.cookie = person;
        }

        // Création de la connexion WebSocket.
        var socket = new WebSocket("ws://127.0.0.1:8080/chat?pseudo=" + person);


        // Ouverture de la connexion
        socket.addEventListener('open', function (event) {
            //document.cookie = "nomUtilisateur=" + person;
            socket.send("Je suis maintenant connecté !");
        });


        // Ecoute des message
        socket.addEventListener('message', function (event) {
            var date = new Date();
            var classBadge;

            console.log(JSON.parse(event.data).emetteur);
            console.log(person);

            if (JSON.parse(event.data).emetteur == person) {
                classBadge = "<span class=\"badge badge-pill badge-info\">";
            } else {
                classBadge = "<span class=\"badge badge-secondary\">";
            }

            $("#chat_body").append(
                classBadge
                + date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds() + "   "
                + "</span>"
                + "<b>"
                + JSON.parse(event.data).emetteur
                + "</b>"
                + " dit : "
                + JSON.parse(event.data).texte + "</br>"
            )

        });


        // Declaration des elements du document
        var bouttonEnvoyer = document.getElementById("bouttonEnvoyer");
        var textInput = document.getElementById("textInput");


        // Detection clique sur le boutton
        bouttonEnvoyer.onclick = function () {
            socket.send(textInput.value);
            return false;
        }


    }
);