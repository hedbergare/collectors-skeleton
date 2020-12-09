<template>
  <!-- Bakgrundsrutan -->
  <div id="infoWrapper">
    <!-- Infoknapp kanske ta bort? -->
    <h1 id="infoButton">Game Rules</h1>

    <!-- Boxen för vilken runda det är just nu -->
    <h2 id="roundBox">Runda 1/4</h2>

    <!-- Boxen för historik för vad de spelarna gör för handlingar -->
    <h2 id="gameHistory">Game history</h2>

    <!-- Boxen för Quit the game-knapp -->
    <div id="quitButton">
      <img src="/images/QuitPlaying.jpg" id="quit" />
    </div>
  </div>
</template>
<style scoped>
#infoWrapper {
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border: dashed black 2px;
  text-align: center;
  background-color: white;
  color: black;
  max-width: 10%;
  float: right;
  height: 100vh;
}

#infoButton {
  grid-row: 1;
  text-align: center;
  box-align: center;
  font-weight: bold;
  text-transform: uppercase;
}

#roundBox {
  grid-row: 2;
  color: black;
}

#gameHistory {
  grid-row: 3;
  color: black;
}

#quitButton {
  grid-row: 4;
  color: black;
  max-width: 100%;
}

#quit {
  max-width: 70%;
}
</style>