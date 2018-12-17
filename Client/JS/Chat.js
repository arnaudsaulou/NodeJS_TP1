//Verification du bon chargement de la page
$(document).ready(
    function () {

        //Test si deja co ou pas
        if(document.cookie != ""){
            person = document.cookie;
        }else {
            //Demande du pseudo
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
            socket.send("Je suis maintenant connecté !");

            $("#list_user").append(JSON.parse(event.data).emetteur);
        });

        // Ecoute des message
        socket.addEventListener('message', function (event) {
            var date = new Date();
            var classBadge;

            //Changement du badge en fonction de l'utilisateur
            if (JSON.parse(event.data).emetteur == person) {
                classBadge = "<span class=\"badge badge-pill badge-info\">";
            } else {
                classBadge = "<span class=\"badge badge-secondary\">";
            }

            //Affichage dans le corps du chat
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

        // Detection clique sur le boutton
        bouttonEnvoyer.onclick = function () {
            var textInput = document.getElementById("textInput");

            //Envoie  du message au serveur
            socket.send(textInput.value);

            //Enlever le contenu après l'envoie
            textInput.value = "";
            return false;
        }

    }
);