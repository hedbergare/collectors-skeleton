<template>
  <div id="background">
    <div id="wrapper">
      <div id="headlineRow">
        <h1>{{ labels.gameOver }}</h1>
      
      </div>
      <div id="playerRow">
        <div v-for="(player, index) in players" :key="index">
          <h1 class="playerName">{{ player.pId }}</h1>
          <p>
            <b>{{ labels.collectedPoints }} </b>{{ player.points }} <br />
            <b>{{ labels.extraPointsMoney }} </b> {{ calcMoneyPoints(player) }}
            <br />
            <b>{{ labels.hiddenItem }} </b> {{ player.secret[0].item }} <br />
            <b>{{ labels.extraPointsSecret }}</b>
            {{ calcSecretPoints(player, marketValues) }} <br />
          </p>

          <h3>
            {{
              labels.totalPoints +
              (player.points +
                calcMoneyPoints(player) +
                calcSecretPoints(player, marketValues))
            }}
          </h3>
          <br />
        </div>
      </div>

      <div id="winnerRow">
        <h1>
          {{ labels.auctionWinnerIs + findWinner(players, marketValues) }}!
        </h1>
        <img src="images/trophy.png" />
      </div>

      <div>
        <a href="http://localhost:8080/#/" class="playAgainButton">
          {{ labels.playAgain }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectorsGameOver",
  props: {
    players: Object,
    marketValues: Object,
    labels: Object,
  },
  methods: {
    findWinner: function (players, marketValues) {
      let allPlayerPoints = {};
      for (let x in players) {
        let extraPMoney = this.calcMoneyPoints(players[x]);
        let extraPsecret = this.calcSecretPoints(players[x], marketValues);
        let totalPoints = extraPMoney + extraPsecret + players[x].points;
        allPlayerPoints[x] = totalPoints;
      }
      let winnerId;
      let winnerPoints = 0;
      let secondWinnerId = "";
      for (let z in allPlayerPoints) {
        if (allPlayerPoints[z] > winnerPoints) {
          winnerPoints = allPlayerPoints[z];
          winnerId = z;
          secondWinnerId = "";
        } else if (allPlayerPoints[z] === winnerPoints && z !== winnerId) {
          secondWinnerId = z;
        }
      }
      if (secondWinnerId === "") {
        return winnerId;
      } else {
        return winnerId + "&" + secondWinnerId;
      }
    },
    calcMoneyPoints: function (player) {
      /* Dividera en spelares antal coins med tre och så får den så många poäng som heltalssiffran är */
      let y;
      let extraPMoney;
      y = player.money / 3;
      extraPMoney = Math.floor(y);
      return extraPMoney;
    },
    calcSecretPoints: function (player, marketValues) {
      let extraPsecret = 0;
      let secretItem = player.secret[0].item;

      if (secretItem === "fastaval") {
        extraPsecret = marketValues["fastaval"];
      } else if (secretItem === "figures") {
        extraPsecret = marketValues["figures"];
      } else if (secretItem === "movie") {
        extraPsecret = marketValues["movie"];
      } else if (secretItem === "music") {
        extraPsecret = marketValues["music"];
      } else if (secretItem === "technology") {
        extraPsecret = marketValues["technology"];
      }

      for (let w in player.skills) {
        if (
          player.skills[w].skill === "VP-fastaval" &&
          secretItem === "fastaval"
        ) {
          extraPsecret += 1;
        } else if (
          player.skills[w].skill === "VP-figures" &&
          secretItem === "figures"
        ) {
          extraPsecret += 1;
        } else if (
          player.skills[w].skill === "VP-movie" &&
          secretItem === "movie"
        ) {
          extraPsecret += 1;
        } else if (
          player.skills[w].skill === "VP-music" &&
          secretItem === "music"
        ) {
          extraPsecret += 1;
        } else if (
          player.skills[w].skill === "VP-technology" &&
          secretItem === "technology"
        ) {
          extraPsecret += 1;
        }
      }
      return extraPsecret;
    },
  },
};
</script>

<style scoped>
#playerRow {
  color: black;
}
h1 {
  margin-block-start: 0em;
  margin-block-end: 0em;
}
#background {
  background-color: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
}
#wrapper {
  height: 90vh;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  margin-top: 5vh;
  border-radius: 20px;
  background-color: rgb(12, 133, 86);
  z-index: 12;
}
#playerRow {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
#winnerRow img {
  height: 15vh;
}
.playAgainButton {
  box-shadow: 0px 1px 0px 0px #3e7327;
  background: linear-gradient(to bottom, #244912 5%, #5a973c 100%);
  background-color: #3a6b21;
  border-radius: 6px;
  border: 1px solid #3f7723;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #5b8a3c;
}
.playAgainButton:hover {
  background: linear-gradient(to bottom, #72b352 5%, #3a6b21 100%);
  background-color: #72b352;
}
.playAgainButton:active {
	position:relative;
	top:1px;
}
.playerName {
  text-decoration: underline;
}

@media screen and (max-width: 850px) {
  img {
    max-height: 10%;
  }
  h1 {
    font-size: 2.5vw;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  p {
    font-size: 1.5vw;
  }
  h3 {
    font-size: 2vw;
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
  .playAgainButton {
    max-height: 5%;
    max-width: 40%;
    font-size: 2vw;
  }
}
</style>