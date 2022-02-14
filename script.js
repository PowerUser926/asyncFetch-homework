async function getCharacters() {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data.results;
}

async function getEpisodes(episodes) {
    let episodesData = [];
    for (let i = 0; i < episodes.length; i++) {
        const response = await fetch(episodes[i]);
        const data = await response.json();
        episodesData.push(data);
    }
    return episodesData;
}

let cards = document.querySelector('.cards');

async function createCharacterCard() {
    let characters = await getCharacters();

    for (const character of characters) {
        let episodesList = '';
        const episodes = await getEpisodes(character.episode);
        for (const episode of episodes) {
            episodesList += `
                <li class="episodeInfo">
                    <p><span>- ${episode.episode}: </span><span> ${episode.name}</span></p>
                </li>
            `;
        }

        cards.innerHTML += `
        <div class="card">
            <p class="characterName">${character.name}</p>
            <p class="location">${character.location.name}</p>
            <img src="${character.image}" alt="character image">
            <ul class="episodes">
                ${episodesList}
            </ul>
        </div>
       `;
    }
}

createCharacterCard();

