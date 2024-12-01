var golobalPlayers = [];
var buttonName = document.getElementById("addeddit-button");
var formAddPlayer = document.getElementById("playerForm");
var headerModal = document.getElementById("header-modal");

async function stockerJoueur() {
  try {
    // Await the fetch call and wait for the response to resolve
    const response = await fetch('players.json');

    // Await the response and parse it as JSON
    const data = await response.json();

    // Now that data is available, store the players in golobalPlayers
    golobalPlayers = data.players;
  } catch (error) {
    console.error('Error loading players:', error);
  }
}

window.onload = stockerJoueur;


function afficherJoueur() {


  const playersContainer = document.getElementById('container');
  playersContainer.innerText = "";
  console.log(golobalPlayers);
  for (let i = 1; i <= golobalPlayers.length; i++) {
    const playerInfo = document.createElement('div');
    playerInfo.classList.add('cartes');
    // Ajouter les informations du joueur
    playerInfo.innerHTML = `
                 <img class="photo" src="${golobalPlayers[i - 1].photo}">
                 <div class="infos">
                     <h3 style="color:antiquewhite">${golobalPlayers[i - 1].name}</h3>
                      <h3 style="color:antiquewhite">${golobalPlayers[i - 1].position}</h3>
                 </div>
                 <div class="flagsLogo">
                     <img src="${golobalPlayers[i - 1].flag}" style="width: 30px;"><br>
                     <img src="${golobalPlayers[i - 1].logo}"style="width: 30px;">
                 </div>
                 <div>
                     <i onclick="supprimerJoueur(${i})" data-id="${i}" class="fa-solid fa-trash" style="color: #1d721e;"></i><br>
                     <i onclick="modifierJoueur(${i})" class="fa-solid fa-pen-to-square" style="color: #1d721e;"></i>
                 </div>
 `;
    playersContainer.appendChild(playerInfo);


    playerInfo.addEventListener("click", (e) => {
      e.stopPropagation();
      remplirCarte(golobalPlayers[i - 1]);
    });


  }



}













//supprimer un joueur 
function supprimerJoueur(playerId) {
  console.log('hi');
  console.log(playerId);

  var isConfirm = confirm("Are you sure you want to proceed?");
  // Trouver l'élément correspondant au joueur avec l'ID donné
  if (isConfirm) {

    const playerElement = document.querySelector(`.fa-trash[data-id="${playerId}"]`).closest('.cartes');

    if (playerElement) {
      // Suppression le joueur 
      playerElement.remove();
    }
    alert("Player deleted successfully");

  } else {
    alert("Player not deleted");
  }

}




// Récupérer l'élément modal et le formulaire
const modal = document.getElementById("playerModal");
const form = document.getElementById("playerForm");
const closeBtn = document.querySelector(".close");

const position = document.getElementById('position');
const joueurInputs = document.getElementById('joueur-inputs');
const gardienInputs = document.getElementById('gardien-inputs');


position.addEventListener('change', function () {
  if (position.value === 'GK') {
    joueurInputs.style.display = 'none';
    gardienInputs.style.display = 'block';
  } else {
    joueurInputs.style.display = 'block';
    gardienInputs.style.display = 'none';
  }
});


// Fonction pour ouvrir le modal
function openModal() {
  formAddPlayer.reset();
  headerModal.innerText = "Ajouter un joueur";
  buttonName.innerText = "Ajouter le joueur";
  modal.style.display = "block";
  buttonName.onclick = function () {
    ajouterJoueur();
  };
}

// Fonction pour fermer le modal
closeBtn.onclick = function () {
  modal.style.display = "none";
}

// Fonction de validation du formulaire
function validateForm(data) {
  console.log(data);
  if (
    data.name.trim() === "" || data.photo.trim() === "" || data.position.trim() === "" ||
    data.flag.trim() === "" || data.club.trim() === "" ||
    data.logo.trim() === "" || data.rating === "" || data.pace === "" ||
    data.shooting === "" || data.passing === "" || data.dribbling === "" ||
    data.defending === "" || data.physical === "") {
    alert("Tous les champs sont obligatoires");
    return false;
  } else if (data.name.length < 3) {
    alert("Le nom du joueur doit contenir au moins 3 caractères");
    return false;
  } else if (data.club.length < 3) {
    alert("Le nom du club doit contenir au moins 3 caractères");
    return false;
  }
  return true;
}

// Fonction pour ajouter un joueur
function ajouterJoueur() {

  console.log("ajouter joueur clicked");

  // Récupérer les valeurs du formulaire
  const playerData = {
    id: golobalPlayers.length + 1,
    name: document.getElementById("name").value,
    photo: document.getElementById("photo").value,
    position: document.getElementById("position").value,
    nationality: document.getElementById("nationality").value,
    flag: document.getElementById("flag").value,
    club: document.getElementById("club").value,
    logo: document.getElementById("logo").value,
    rating: parseInt(document.getElementById("rating").value),
    diving: 0,
    handling: 0,
    kicking: 0,
    reflexes: 0,
    speed: 0,
    positioning: 0,
    pace: 0,
    shooting: 0,
    passing: 0,
    dribbling: 0,
    defending: 0,
    physical: 0
  };

  if (playerData.position === "GK") {
    playerData.diving = parseInt(document.getElementById("diving").value);
    playerData.handling = parseInt(document.getElementById("handling").value);
    playerData.kicking = parseInt(document.getElementById("kicking").value);
    playerData.reflexes = parseInt(document.getElementById("reflexes").value);
    playerData.speed = parseInt(document.getElementById("speed").value);
    playerData.positioning = parseInt(document.getElementById("positioning").value);
  } else {
    playerData.pace = parseInt(document.getElementById("pace").value);
    playerData.shooting = parseInt(document.getElementById("shooting").value);
    playerData.passing = parseInt(document.getElementById("passing").value);
    playerData.dribbling = parseInt(document.getElementById("dribbling").value);
    playerData.defending = parseInt(document.getElementById("defending").value);
    playerData.physical = parseInt(document.getElementById("physical").value);
  }

  // Valider les informations
  if (validateForm(playerData)) {
    // Ajouter le joueur au tableau
    golobalPlayers.push(playerData);
    // Fermer le modal
    modal.style.display = "none";
    afficherJoueur();

  }

}
// Ouvrture du modal
document.getElementById("openModalBtn").onclick = openModal;

// modifier les informations d'un joueur

function modifierJoueur(playerId) {
  console.log("modifier joueur");
  console.log(playerId);

  openModal();
  const playerToEdit = golobalPlayers.find(player => player.id === playerId);
  if (playerToEdit) {

    console.log(playerToEdit);
    document.getElementById("name").value = playerToEdit.name;
    document.getElementById("photo").value = playerToEdit.photo;
    document.getElementById("position").value = playerToEdit.position;
    document.getElementById("nationality").value = playerToEdit.nationality;
    document.getElementById("flag").value = playerToEdit.flag;
    document.getElementById("club").value = playerToEdit.club;
    document.getElementById("logo").value = playerToEdit.logo;
    document.getElementById("rating").value = playerToEdit.rating;

    if (playerToEdit.position === "GK") {
      gardienInputs.style.display = "block";
      joueurInputs.style.display = "none";
      document.getElementById("diving").value = playerToEdit.diving;
      document.getElementById("handling").value = playerToEdit.handling;
      document.getElementById("kicking").value = playerToEdit.kicking;
      document.getElementById("reflexes").value = playerToEdit.reflexes;
      document.getElementById("speed").value = playerToEdit.speed;
      document.getElementById("positioning").value = playerToEdit.positioning;
    } else {
      gardienInputs.style.display = "none";
      joueurInputs.style.display = "block";
      document.getElementById("pace").value = playerToEdit.pace;
      document.getElementById("shooting").value = playerToEdit.shooting;
      document.getElementById("passing").value = playerToEdit.passing;
      document.getElementById("dribbling").value = playerToEdit.dribbling;
      document.getElementById("defending").value = playerToEdit.defending;
      document.getElementById("physical").value = playerToEdit.physical;
    }
  }

  buttonName.innerText = "Modifier le joueur";
  headerModal.innerText = "Modifier un joueur";







  buttonName.onclick = function () {
    console.log("modifier joueur clicked");
    playerToEdit.name = document.getElementById("name").value;
    playerToEdit.photo = document.getElementById("photo").value;
    playerToEdit.position = document.getElementById("position").value;
    playerToEdit.nationality = document.getElementById("nationality").value;
    playerToEdit.flag = document.getElementById("flag").value;
    playerToEdit.club = document.getElementById("club").value;
    playerToEdit.logo = document.getElementById("logo").value;
    playerToEdit.rating = parseInt(document.getElementById("rating").value);

    if (playerToEdit.position === "GK") {
      playerToEdit.pace = parseInt(document.getElementById("diving").value);
      playerToEdit.shooting = parseInt(document.getElementById("handling").value);
      playerToEdit.passing = parseInt(document.getElementById("kicking").value);
      playerToEdit.dribbling = parseInt(document.getElementById("reflexes").value);
      playerToEdit.defending = parseInt(document.getElementById("speed").value);
      playerToEdit.physical = parseInt(document.getElementById("positioning").value);
    } else {
      playerToEdit.pace = parseInt(document.getElementById("pace").value);
      playerToEdit.shooting = parseInt(document.getElementById("shooting").value);
      playerToEdit.passing = parseInt(document.getElementById("passing").value);
      playerToEdit.dribbling = parseInt(document.getElementById("dribbling").value);
      playerToEdit.defending = parseInt(document.getElementById("defending").value);
      playerToEdit.physical = parseInt(document.getElementById("physical").value);
    }



    modal.style.display = "none";

    afficherJoueur();
  };

}






const cartesA = document.querySelectorAll(".cart");

let selectedCarte = null;

// parcourir tout les cartes vides;
cartesA.forEach((carte) => {
  carte.addEventListener("click", () => {
    selectedCarte = carte;
    afficherJoueur();
  });
});

// parcourir tout les t-shirt , et quand on survol sur le t-shirt les informations du joueur vont afficher 

const T_shirts = document.querySelectorAll(".T-shirtFut");

T_shirts.forEach((T_shirt) => {
  T_shirt.addEventListener("click", () => {
    selectedCarte = T_shirt; //stockage de la carte
    afficherJoueur();
  });
});




function remplirCarte(player) {

  console.log("kjls");
  console.log(player);

  if (!selectedCarte) return;


  const cartePosition = selectedCarte.getAttribute("data-position"); // récuperer la position de la carte

  // vérification du position de la carte
  if (player.position !== cartePosition) {
    alert(` on peut pas mettre  ${player.name} dans cette position : ${cartePosition}, position du joueur : ${player.position}`);
    return;
  }
  if (player.position !== "GK") {
    selectedCarte.innerHTML = `
    <img src="images/cartfut.png">
    <p style="position: relative; bottom:112px;right:26px;font-size:17px;">${player.position}</p>
    <p style="position: relative; bottom:112px;right:26px;font-size:11px;">${player.rating}</p>
    <img style="position: relative; bottom:160px;left:10px;font-size:17px;height:73px;width:60px;"  src="${player.photo}">
    <p style="position: relative; bottom:185px;right:26px;font-size:7px;">${player.name}</p>
    <p style="position: relative; bottom:174px;right:37px;font-size:6px;">PAC</p><br>
    <p style="position: relative; bottom:193px;right:37px;font-size:9px;">${player.pace}</p>
    <p style="position: relative; bottom:209px;right:23px;font-size:6px;">SHO<br>
    <p style="position: relative; bottom:210px;right:23px;font-size:9px;">${player.shooting}</p>
    </p>
    <p style="position: relative; bottom:227px;right:9px;font-size:6px;">PAS<br>
    <p style="position: relative; bottom:227px;right:9px;font-size:9px;">${player.passing}</p>
    </p>
    <p style="position: relative; bottom:245px;left:35px;font-size:6px;">DRI<br>
    <p style="position: relative; bottom:245px;left:35px;font-size:9px;">${player.dribbling}</p>
    </p>
    <p style="position: relative; bottom:262px;left:21px;font-size:6px;">DEF<br>
    <p style="position: relative; bottom:262px;left:21px;font-size:9px;">${player.defending}</p>
    </p>
    <p style="position: relative; bottom:279px;left:8px;font-size:6px;">PHY<br>
    <p style="position: relative; bottom:280px;left:8px;font-size:9px;">${player.physical}</p>
    </p>
    <img style="position: relative; bottom:285px;right:5px;font-size:6px;height:7px;width:10px;"
      src="${player.flag}">
    <img style="position: relative; bottom:283px;left:3px;font-size:6px;height:10px;width:10px;"
      src="${player.logo}">
`;
  }
  else {
    selectedCarte.innerHTML = `
        <img src="images/cartfut.png">
        <p style="position: relative; bottom:112px;right:26px;font-size:17px;">${player.position}</p>
        <p style="position: relative; bottom:112px;right:26px;font-size:11px;">${player.rating}</p>
        <img style="position: relative; bottom:160px;left:10px;font-size:17px;height:73px;width:60px;"  src="${player.photo}">
        <p style="position: relative; bottom:185px;right:26px;font-size:7px;">${player.name}</p>
        <p style="position: relative; bottom:174px;right:37px;font-size:6px;">PAC</p><br>
        <p style="position: relative; bottom:193px;right:37px;font-size:9px;">${player.diving}</p>
        <p style="position: relative; bottom:209px;right:23px;font-size:6px;">SHO<br>
        <p style="position: relative; bottom:210px;right:23px;font-size:9px;">${player.handling}</p>
        </p>
        <p style="position: relative; bottom:227px;right:9px;font-size:6px;">PAS<br>
        <p style="position: relative; bottom:227px;right:9px;font-size:9px;">${player.kicking}</p>
        </p>
        <p style="position: relative; bottom:245px;left:35px;font-size:6px;">DRI<br>
        <p style="position: relative; bottom:245px;left:35px;font-size:9px;">${player.reflexes}</p>
        </p>
        <p style="position: relative; bottom:262px;left:21px;font-size:6px;">DEF<br>
        <p style="position: relative; bottom:262px;left:21px;font-size:9px;">${player.speed}</p>
        </p>
        <p style="position: relative; bottom:279px;left:8px;font-size:6px;">PHY<br>
        <p style="position: relative; bottom:280px;left:8px;font-size:9px;">${player.positioning}</p>
        </p>
        <img style="position: relative; bottom:285px;right:5px;font-size:6px;height:7px;width:10px;"
          src="${player.flag}">
        <img style="position: relative; bottom:283px;left:3px;font-size:6px;height:10px;width:10px;"
          src="${player.logo}">
    `;
  }


  selectedCarte.onclick = function () {
    remplirCarte(player);
  }
}
