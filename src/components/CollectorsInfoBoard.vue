<template>
  <!-- Bakgrundsrutan -->
  <div id="infoWrapper">
    <!-- Infoknapp -->
    <a
      href="https://docs.google.com/document/d/1R3R4nk1pNI_xqOas4X_5TR7AOW6FE_bXbMcdh1bZfI0/edit?usp=sharing"
      target="_blank"
      >Show me game rules!</a
    >

    <!-- Boxen för vilken runda det är just nu -->
    <div id="roundBox">
      <br />
      Round 1/4
    </div>

    <!-- Boxen för historik för vad de spelarna gör för handlingar -->
    <div id="gameHistory"><br />Game history</div>

    <!-- Boxen för Quit the game-knapp -->
    <div id="quitButton">
      <a href="http://localhost:8080/#/"
        ><img src="/images/QuitPlaying.jpg"
      /></a>
    </div>
  </div>
</template>

<style scoped>
#infoWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  background-color: white;
  max-width: 100%;
  float: right;
  color: black;
  height: 80%;
  font-size: x-small;
}

a:link,
a:visited {
  background-color: white;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: dashed black 2px;
  font-size: x-large;
  max-height: 100%;
}

a:hover,
a:active {
  background-color: gray;
}

#roundBox {
  grid-column: 2;
  font-size: 2em;
  border: dashed black 2px;
}

#gameHistory {
  grid-column: 3;
  font-size: 1.7em;
  border: 2px dashed black;
}

#quitButton {
  grid-column: 4;
  max-width: 100%;
  max-height: 100%;
}

#quitButton img {
  max-width: 100%;
}
</style>