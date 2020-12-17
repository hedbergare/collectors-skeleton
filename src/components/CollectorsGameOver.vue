<template>
  <div id="background">
    <div id="wrapper">
      <div id="headlineRow">
        <h1>The Game is Over<br />and the Final Results are in!</h1>
      </div>
      <div id="playerRow">
        <div v-for="(player, index) in players" :key="index">
          <h1>{{ player.pId }}</h1>
          <b>Collected points: </b>{{ player.points }} <br />
          <b>Extra points from money:</b> {{ calcMoneyPoints(player) }} <br />
          <b>Hidden item: </b> {{ player.secret[0].item }} <br />
          <b>Extra points from secret card:</b>
          {{ calcSecretPoints(player, marketValues) }} <br />
          <h3>
            Total points:
            {{
              player.points +
              calcMoneyPoints(player) +
              calcSecretPoints(player, marketValues)
            }}
          </h3>
          <br />
        </div>
      </div>

      <div id="winnerRow">
        <h1>And the Winner is {{ findWinner(players, marketValues) }}!</h1>
        <img src="images/trophy.png" />
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
      console.log(allPlayerPoints);
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
        /* for (let y in allPlayerPoints) {
          if (allPlayerPoints[z] < allPlayerPoints[y]) {
            console.log("spelare" + y + "vann");
            return y;
          } else if (allPlayerPoints[z] === allPlayerPoints[y] && z !== y) {
            console.log("oavgjort");
            return "several of you";
          } else {
            console.log("spelare" + z + "vann");
            return z;
          }
        } */
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
#background {
  color: white;
  background-color: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
}

#wrapper {
  height: 80vh;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  margin-top: 10vh;
  border-radius: 20px;
  background-color: rgb(12, 133, 86);
  z-index: 12;
}

#playerRow {
  display: grid;
  grid-template-columns: auto auto auto auto;
}

#winnerRow img {
  height: 20vh;
}
</style>