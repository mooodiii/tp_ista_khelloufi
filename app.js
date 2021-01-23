document.addEventListener("DOMContentLoaded", () => {
    let nom = document.getElementById("nom");
    let residence = document.getElementById("resid");
    let email = document.getElementById("email");
    let age = document.getElementById("age");
    let checkboxes = document.getElementsByName("check");
    let profession = document.getElementById("profession");
    let send = document.getElementById("send");
    let cancel = document.getElementById("cancel");
    let Div = document.getElementById('d1');


    if (localStorage.getItem('values') !== null) {
        let obj = localStorage.getItem('values');

        obj = JSON.parse(obj)
        Div.innerHTML = `<p>Nom: ${obj.nom} <br>
            Residence: ${obj.residence} <br>
            Email: ${obj.email} <br>
            Langue parler: ${obj.langue}</p>`;
    }


    cancel.onclick = () => {
        nom.value = "";
        residence.value = "";
        email.value = "";
        age.value = "";
        checkboxes.forEach((check) => {
            if (check.checked) {
                check.checked = false;
            }
        });
        profession.selectedIndex = 0;
    }
    let objet = {
        nom: "",
        residence: "",
        email: "",
        langue: []
    }

    function valider() {
        let count = 0;
        let langue = [];
        checkboxes.forEach((check) => {
            if (check.checked) {
                langue.push(check.value);
                count++;
            }
        });
        if (nom.value === "") {
            setErrorFor("nom", "ne peux pas être vide");
            return;
        } else if (!isValid(nom.value)) {
            setErrorFor("nom", "doit etre valide");
            return;
        } else if (residence.value === "") {
            setErrorFor("residence", "ne peux pas être vide");
            return;
        } else if (!isValid(residence.value)) {
            setErrorFor("residence", "doit etre valide");
            return;
        } else if (!isValidEmail(email.value)) {
            setErrorFor("email", "doit etre valide");
            return;
        } else if (parseInt(age.value) < 18) {
            setErrorFor("Age", "doit etre superieur de 18ans.");
            return;
        } else if (count < 2) {
            setErrorFor(
                "Langue Parler",
                "au moins deux langues doit etre cocher."
            );
            return;
        } else {
            Div.innerHTML = `<p>Nom: ${nom.value} <br>
            Residence: ${residence.value} <br>
            Email: ${email.value} <br>
            Langue parler: ${langue.toString()}</p>`;
            objet.nom = nom.value;
            objet.residence = residence.value;
            objet.email = email.value;
            objet.langue = langue;
            localStorage.setItem('values', JSON.stringify(objet))
        }
    }

    send.onclick = () => {
        valider()
    }


    function setErrorFor(input, message) {
        Div.innerHTML = `<h2>${input}: ${message}<h2>`;
    }

    function isValidEmail(email) {
        return /^([^0-9])[^ ]+@([^0-9])[^ ]+\.(ma|com)$/.test(email);
    }

    function isValid(input) {
        return /[a-z ]+$/.test(input);
    }
});