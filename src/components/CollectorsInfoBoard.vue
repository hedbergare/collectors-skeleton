<template>
  <!-- Bakgrundsrutan -->
  <div id="infoWrapper">
    <!-- Infoknapp -->
    <div class="left">
      <div class="roundCont">
        <h1 id="roundBox"> {{labels.round + roundCounter + labels.roundNumber}}</h1>
      </div>
      <div>
        <a
          href="https://docs.google.com/document/d/1R3R4nk1pNI_xqOas4X_5TR7AOW6FE_bXbMcdh1bZfI0/edit?usp=sharing"
          class="rulesButton"
          target="_blank"
        >
          {{ labels.showRules }}
        </a>
      </div>
      <!-- Boxen för vilken runda det är just nu -->

      <!-- Boxen för Quit the game-knapp -->
      <div>
        <a href="http://localhost:8080/#/" class="quitButton">
          {{ labels.quit }}
        </a>
      </div>
    </div>

    <!-- Boxen för historik för vad de spelarna gör för handlingar -->
    <div class="right">
      <h3>{{labels.gameHistory}}</h3>
      <div id="consoleHistory">
        <p>{{labels.gameStarted}}</p>
        <p v-for="(text, index) in consoleHistory" :key="index">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectorsInfoBoard",
  props: {
    roundCounter: Number,
    consoleHistory: Array,
    labels: Object,
  },
  watch: {
    consoleHistory: function () {
      var element = document.getElementById("consoleHistory");
      element.scrollTop = element.scrollHeight;
    },
  },
};
</script>

<style scoped>
#infoWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  float: right;
  color: black;
  width: 100%;
  position: relative;
  max-height: 100%;
}
.left {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.right {
    margin-top: 5%;
  grid-template-rows: 1fr 1fr;
  background-color: white;
  border-radius: 10px;
  height:100%;
}
.roundCont {
  grid-column: 1/3;
}
#roundBox {
  grid-column: 1/4;
  color: white;
}

#consoleHistory {
  background-color: rgb(218, 218, 218);
  margin: 1%;
  overflow-y: scroll;
  color: black;
  max-height: 70px;
}

.quitButton {
  max-width: 100%;
  max-height: 100%;
}

.rulesButton {
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color: #eae0c2;
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  color: white;
  font-size: 90%;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #000000;
}

.rulesButton:hover {
  background: linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color: #ccc2a6;
}

.rulesButt:active {
  position: relative;
  top: 1px;
}

.quitButton {
  box-shadow: inset 0px 1px 0px 0px #f29c93;
  background: linear-gradient(to bottom, #fe1a00 5%, #ce0100 100%);
  background-color: #fe1a00;
  border-radius: 15px;
  border: 2px solid #d83526;
  display: inline-block;
  cursor: pointer;
  color: white;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}

.quitButton:hover {
  background: linear-gradient(to bottom, #ce0100 5%, #fe1a00 100%);
  background-color: #ce0100;
}

.quitButton:active {
  position: relative;
  top: 1px;
}
</style>