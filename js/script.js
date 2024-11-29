

// fonction pour l'affichage des joueurs
function afficherJoueur(){
fetch('players.json')
.then(response => response.json())
.then(data => {
    
    const playersContainer = document.getElementById('container');
  playersContainer.innerText=""
    
    // Boucle pour parcourir tous les joueurs et les afficher
    data.players.forEach((player,index) => {
       
    // Créer un élément div pour chaque joueur
     const playerInfo = document.createElement('div');
     playerInfo.classList.add('cartes');
      // Ajouter les informations du joueur
      playerInfo.innerHTML = `
                  <img class="photo" src="${player.photo}">
                  <div class="infos">
                      <h3 style="color:antiquewhite">${player.name}</h3>
                       <h3 style="color:antiquewhite">${player.position}</h3>
                  </div>
                  <div class="flagsLogo">
                      <img src="${player.flag}" style="width: 30px;"><br>
                      <img src="${player.logo}"style="width: 30px;">
                  </div>
                  <div >
                      <i onclick="supprimerJoueur(${player.id})" data-id="${player.id}" class="fa-solid fa-trash" style="color: #1d721e;"></i><br>
                      <i onclick="modifierJoueur(${player.id})" class="fa-solid fa-pen-to-square" style="color: #1d721e;"></i>
                  </div>
            
  `;
  console.log(playerInfo);
  // Ajouter le joueur à la div principale
  playersContainer.appendChild( playerInfo);
//   remplirCarte(player);

playerInfo.addEventListener("click",(e)=>{
    e.stopPropagation()
    remplirCarte(player);
    })

});

})
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
                              <i onclick="modifierJoueur(${player.id})" class="fa-solid fa-pen-to-square" style="color: #1d721e;"></i>
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

            
           

              modal.style.display = "none";
        };
    }
}



const cartesA = document.querySelectorAll(".cart");
// pour afficher la liste des joueurs
let selectedCarte = null;

cartesA.forEach((carte) => {
  carte.addEventListener("click", () => {
    selectedCarte = carte; //stockage de la carte

    afficherJoueur();
  });
});



function remplirCarte(player) {
    if (!selectedCarte) return;


    const cartePosition = selectedCarte.getAttribute("data-position"); // récuperer la position de la carte
   console.log(cartePosition);
  // vérification du position de la carte
  if (player.position !== cartePosition) {
    alert(` on peut pas mettre  ${player.name} dans cette position : ${cartePosition}, position du joueur : ${player.position}`);
    return;  
  }

    selectedCarte.innerHTML = `
          <img src="/images/cartfut.png">
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







