<template>
  <!-- Bakgrundsrutan -->
  <div id="infoWrapper">
    <!-- Infoknapp -->
    <div id="infoButton">Game Rules
      <button type="button">Show me game rules!</button>
    </div>

    <!-- Boxen för vilken runda det är just nu -->
    <div id="roundBox">Round 1/4</div>

    <!-- Boxen för historik för vad de spelarna gör för handlingar -->
    <div id="gameHistory">Game history</div>

    <!-- Boxen för Quit the game-knapp -->
    <div id="quitButton">
      <img src="/images/QuitPlaying.jpg" />
    </div>
  </div>
</template>
<style scoped>
#infoWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
  border: dashed black 2px;
  text-align: center;
  background-color: white;
  max-width: 100%;
  float: right;
  color: black;
  height: 80%;
  font-size: x-small;
}

#infoButton {
  grid-column: 1;
  text-align: center;
  text-transform: uppercase;
  font-size: 2em;
}

#roundBox {
  grid-column: 2;
  font-size: 2em;
}

#gameHistory {
  grid-column: 3;
  font-size: 1.7em;
  border: 2px dashed black;
}

#quitButton {
  grid-column: 4;
  max-width: 100%;
}

#quitButton img {
  max-width: 70%;
  max-height: 100%;
}
</style>