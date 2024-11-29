

// fonction pour l'affichage des joueurs
function afficherJoueur(){
fetch('/players.json')
.then(response => response.json())
.then(data => {
    
    const playersContainer = document.getElementById('container');
  
    
    // Boucle pour parcourir tous les joueurs et les afficher
    data.players.forEach(player => {
       
    // Créer un élément div pour chaque joueur
     const playerInfo = document.createElement('div');
     playerInfo.classList.add('cartes');
      // Ajouter les informations du joueur
      playerInfo.innerHTML = `
                  <img class="photo" src="${player.photo}">
                  <div class="infos">
                      <h3 style="color:antiquewhite">${player.name}</h3>
                      <h3 style="color:antiquewhite">${player.pace}</h3>
                  </div>
                  <div class="flagsLogo">
                      <img src="${player.flag}" style="width: 30px;"><br>
                      <img src="${player.logo}"style="width: 30px;">
                  </div>
                  <div >
                      <i onclick="supprimerJoueur(${player.id})" data-id="${player.id}" class="fa-solid fa-trash" style="color: #1d721e;"></i><br>
                      <i class="fa-solid fa-pen-to-square" style="color: #1d721e;"></i>
                  </div>
            
  `;
  console.log(playerInfo);
  // Ajouter le joueur à la div principale
  playersContainer.appendChild( playerInfo);
});

})
.catch(error => console.error('Erreur lors de la récupération des données:', error));
}



//supprimer un joueur 
function supprimerJoueur(playerId) {
    console.log('hi');
    // Trouver l'élément correspondant au joueur avec l'ID donné
    const playerElement = document.querySelector(`.fa-trash[data-id="${playerId}"]`).closest('.cartes');
    
    if (playerElement) {
        // Suppression le joueur 
        playerElement.remove();
    }
}


// fonction d'ajout d'un joueur
// Tableau pour stocker les joueurs

let players = [];
// Récupérer l'élément modal et le formulaire
const modal = document.getElementById("playerModal");
const form = document.getElementById("playerForm");
const closeBtn = document.querySelector(".close");

// Fonction pour ouvrir le modal
function openModal() {
    modal.style.display = "block";
}

// Fonction pour fermer le modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Fonction de validation du formulaire
function validateForm(data) {
    for (let key in data) {
        if (data[key] === "") {
            alert(`${key} est requis.`);
            return false;
        }
    }
    return true;
}

// Fonction pour ajouter un joueur
form.onsubmit = function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const playerData = {
        name: document.getElementById("name").value,
        photo: document.getElementById("photo").value,
        position: document.getElementById("position").value,
        nationality: document.getElementById("nationality").value,
        flag: document.getElementById("flag").value,
        club: document.getElementById("club").value,
        logo: document.getElementById("logo").value,
        rating: parseInt(document.getElementById("rating").value),
        pace: parseInt(document.getElementById("pace").value),
        shooting: parseInt(document.getElementById("shooting").value),
        passing: parseInt(document.getElementById("passing").value),
        dribbling: parseInt(document.getElementById("dribbling").value),
        defending: parseInt(document.getElementById("defending").value),
        physical: parseInt(document.getElementById("physical").value),
    };

    // Valider les informations
    if (validateForm(playerData)) {
        // Ajouter le joueur au tableau
        players.push(playerData);
        // Fermer le modal
        modal.style.display = "none";
            const playersContainer = document.getElementById('container');
            // Boucle pour parcourir tous les joueurs et les afficher
            players.forEach(player => {
            // Créer un élément div pour chaque joueur
             const playerInfo = document.createElement('div');
             playerInfo.classList.add('cartes');
              // Ajouter les informations du joueur
              playerInfo.innerHTML = `
                          <img class="photo" src="${player.photo}">
                          <div class="infos">
                              <h3 style="color:antiquewhite">${player.name}</h3>
                              <h3 style="color:antiquewhite">${player.pace}</h3>
                          </div>
                          <div class="flagsLogo">
                              <img src="${player.flag}" style="width: 30px;"><br>
                              <img src="${player.logo}"style="width: 30px;">
                          </div>
                          <div >
                              <i onclick="supprimerJoueur(${player.id})" data-id="${player.id}" class="fa-solid fa-trash" style="color: #1d721e;"></i><br>
                              <i class="fa-solid fa-pen-to-square" style="color: #1d721e;"></i>
                          </div>
                    
          `;
          console.log(playerInfo);
          // Ajouter le joueur à la div principale
          playersContainer.appendChild( playerInfo);
          playerData='';
          
        });
    }
}
// Ouvrture du modal
document.getElementById("openModalBtn").onclick = openModal;
 // modifier les informations d'un joueur
  
 function modifierJoueur(playerId) {
        
    openModal();

    
    const playerToEdit = players.find(player => player.id === playerId);

    if (playerToEdit) {
       
        document.getElementById("name").value = playerToEdit.name;
        document.getElementById("photo").value = playerToEdit.photo;
        document.getElementById("position").value = playerToEdit.position;
        document.getElementById("nationality").value = playerToEdit.nationality;
        document.getElementById("flag").value = playerToEdit.flag;
        document.getElementById("club").value = playerToEdit.club;
        document.getElementById("logo").value = playerToEdit.logo;
        document.getElementById("rating").value = playerToEdit.rating;
        document.getElementById("pace").value = playerToEdit.pace;
        document.getElementById("shooting").value = playerToEdit.shooting;
        document.getElementById("passing").value = playerToEdit.passing;
        document.getElementById("dribbling").value = playerToEdit.dribbling;
        document.getElementById("defending").value = playerToEdit.defending;
        document.getElementById("physical").value = playerToEdit.physical;



        form.onsubmit = function (event) {
            event.preventDefault();

            playerToEdit.name = document.getElementById("name").value;
            playerToEdit.photo = document.getElementById("photo").value;
            playerToEdit.position = document.getElementById("position").value;
            playerToEdit.nationality = document.getElementById("nationality").value;
            playerToEdit.flag = document.getElementById("flag").value;
            playerToEdit.club = document.getElementById("club").value;
            playerToEdit.logo = document.getElementById("logo").value;
            playerToEdit.rating = parseInt(document.getElementById("rating").value);
            playerToEdit.pace = parseInt(document.getElementById("pace").value);
            playerToEdit.shooting = parseInt(document.getElementById("shooting").value);
            playerToEdit.passing = parseInt(document.getElementById("passing").value);
            playerToEdit.dribbling = parseInt(document.getElementById("dribbling").value);
            playerToEdit.defending = parseInt(document.getElementById("defending").value);
            playerToEdit.physical = parseInt(document.getElementById("physical").value);

            
            updatePlayerDisplay(playerToEdit);

              modal.style.display = "none";
        };
    }
}










