

var golobalPlayers = []; // tableau pour stocker les joueurs existent dans le fichier json anisi que les joueurs ajoutables vers la suite
var buttonName = document.getElementById("addeddit-button"); // récupération du boutton pour la modification
var formAddPlayer = document.getElementById("playerForm");//récupération du formulaire du modal
var headerModal = document.getElementById("header-modal");//récupération  du titre pour le modifier en cas du modification


// fonction pour récupérer les informations du joueurs dans le fichier json 
async function stockerJoueur() {
  try {
    // Attendez l'appel de fetch() et attendez que la réponse soit résolue
    const response = await fetch('players.json');

    // Attendez la réponse et analysez-la au format JSON
    const data = await response.json();

    // stockez les joueurs dans globalPlayers
    golobalPlayers = data.players;
  } 
  catch (error) {
    console.error('Error loading players:', error);
  }
}

//une fois en charge la page on appelle la fonction stockerJoueur
window.onload = stockerJoueur;


// fonction pour l'affichage du joueurs stockés dans le tableau globalPlayers
function afficherJoueur() {

  const playersContainer = document.getElementById('container'); // récupérer l'emplacement ou on veut stocker les joueurs récupérée 

  playersContainer.innerText = "";

  console.log(golobalPlayers); // tester si le tableau est chargé de données ou non

  // boucler sur tout les éléments du tableau pour l'afficher"
  for (let i = 1; i <= golobalPlayers.length; i++){

    // création d'un div pour chaque joueur 
    const playerInfo = document.createElement('div');

    //l'ajout du class "cartes" pour le div crée
    playerInfo.classList.add('cartes');

    // Ajouter les informations du joueur au div 
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

  //  ajouter le div au container
    playersContainer.appendChild(playerInfo);


  // un événement click pour remplir la carte convenable dans le terrain par les données du joueur"
    playerInfo.addEventListener("click", (e) => {
      e.stopPropagation();
      remplirCarte(golobalPlayers[i - 1]);
    });


  }

}


// fonction pour la suppression d'un joueur  
function supprimerJoueur(playerId) {

  // vérifier si l'id est bien récupérer après le click
  console.log(playerId);

  // test de confirmation pour la suppression  
  var isConfirm = confirm("Êtes-vous sûr de vouloir continuer?");

  // si on veut vraiment supprimer le joueur
  if (isConfirm) {
          // Trouver l'élément correspondant au joueur avec l'ID donné
          const playerElement = document.querySelector(`.fa-trash[data-id="${playerId}"]`).closest('.cartes');
          if (playerElement) {
               // Suppression le joueur 
               playerElement.remove();
          }

          alert("Joueur supprimé avec succès");
  } 
  // si on veut pas supprimer le joueur
  else {
    alert("Joueur non supprimé");
  }

}




// Récupérer l'élément modal et le formulaire
const modal = document.getElementById("playerModal");
const form = document.getElementById("playerForm");
const closeBtn = document.querySelector(".close"); // récupérer la croix pour la fermeture du modal 

const position = document.getElementById('position'); //récupérer la postion du joueur
const joueurInputs = document.getElementById('joueur-inputs');  // inputs pour le joueur 
const gardienInputs = document.getElementById('gardien-inputs'); // inputs pour le gardient


// remplir le formulaire selon la position du joueurs , est ce qu'il un joueurs normal ou un gardient 
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
  formAddPlayer.reset(); // réinitialise  le modal à chaque sortie
  headerModal.innerText = "Ajouter un joueur";
  buttonName.innerText = "Ajouter le joueur";
  modal.style.display = "block";
  buttonName.onclick = function () {
    ajouterJoueur();
  };
}

// fermer le modal
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

// fonction pour la modifcation des informations d'un joueur
function modifierJoueur(playerId) {
  console.log(playerId);

  // ouverture du modal 
  openModal();
  // trouver l'élément à modifier à partir du l'id"
  const playerToEdit = golobalPlayers.find(player => player.id === playerId);

  // si l'élement est trouvé on remplit les champs du formulaire par les inofrmations du joeurs qui sont déjà stockées
  if (playerToEdit) {
    document.getElementById("name").value = playerToEdit.name;
    document.getElementById("photo").value = playerToEdit.photo;
    document.getElementById("position").value = playerToEdit.position;
    document.getElementById("nationality").value = playerToEdit.nationality;
    document.getElementById("flag").value = playerToEdit.flag;
    document.getElementById("club").value = playerToEdit.club;
    document.getElementById("logo").value = playerToEdit.logo;
    document.getElementById("rating").value = playerToEdit.rating;

    // étudier les cas des position ,en cas du gardient et cas du joueur
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

  buttonName.innerText = "Modifier le joueur";//changer le contenu du boutton du modal par Modifier le joueur
  headerModal.innerText = "Modifier un joueur";//changer le titre du modal par Modifier le joueur

  //  modification par des nouvelles valeurs 
  buttonName.onclick = function () {
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

//Selectionner tout les cartes vides 
const cartesA = document.querySelectorAll(".cart");
let selectedCarte = null;

// parcourir tout les cartes vides;
cartesA.forEach((carte) => {
  carte.addEventListener("click", () => {
    selectedCarte = carte;
    afficherJoueur();
  });
});


// parcourir tout les t-shirt
const T_shirts = document.querySelectorAll(".T-shirtFut");

//Selectionner tout les  t-shirt vides 
T_shirts.forEach((T_shirt) => {
  T_shirt.addEventListener("click", () => {
    selectedCarte = T_shirt; //stockage de la carte
    afficherJoueur();
  });
});



// fontion pour le remplissage des cartes vides par les informations des joueurs 
function remplirCarte(player) {

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


  // apple de la fonction encore une fois pour chager un joueur par un autre
  selectedCarte.onclick = function () {
    remplirCarte(player);
  }
}
