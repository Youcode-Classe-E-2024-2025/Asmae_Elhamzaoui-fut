
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
// Appeler la fonction pour afficher les joueurs après la suppression 
afficherJoueur();