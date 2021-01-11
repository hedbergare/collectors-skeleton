<template>
  <div class="center">
    <div class="wrapper">
      <div style="margin: 0 auto">
        <div class="headline">
          <h1>Welcome to Collectors</h1>
          <p>- a worker-placement boardgame for everyone of all ages!</p>
        </div>

        <button class="demoButton" v-on:click="btnClick">
          Watch demo and learn how to play / Se en demo för att lära dig spelet
        </button>

        <div class="langBoxes">
          <ul>
            <img src="images/en_flag.png" />
            <li v-for="i in 3" :key="i">
              <a @click="setupCollectors(i + 1, 'en')"
                >Set up a game of Collectors for {{ i + 1 }} players</a
              >.
            </li>
          </ul>

          <ul>
            <img src="images/se_flag.png" />
            <li v-for="i in 3" :key="i">
              <a @click="setupCollectors(i + 1, 'se')"
                >Spela Collectors med {{ i + 1 }} spelare</a
              >.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  created: function () {
    this.$store.commit("SET_ROOM_ID");
  },
  methods: {
    setupCollectors: function (playerCount, lang) {
      console.log("Språk i home" + lang);
      this.$store.commit("SETUP_GAME", {
        roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang,
      });
      this.$router.push("/room/" + this.$store.state.roomId);
    },
    /*     Hemsidan som öppnas för att visa Demo*/
      btnClick: function () {
      window.open("https://docs.google.com/presentation/d/1AFC3ulvGyigvaEGkeUpGniZZLDRS3i4CyLyY6terZYE/edit?usp=sharing");
    },
  },
};
</script>

<style scoped>
button {
  margin: 25px 5px 20px 20px;
}
.headline {
  text-align: center;
}
img {
  max-width: 15%;
}
.center {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 1em;
}
.wrapper {
  background-color: rgb(247, 201, 118);
  color: white;
  margin: 0 auto;
  width: 50%;
  margin-top: 5%;
  padding: 0 10%;
  max-height: 80%;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
}
.langBoxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
ul {
  padding: 0;
  margin: 0 auto;
}
ul li {
  margin: 0 auto;
  list-style-type: none;
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: linear-gradient(to bottom, #e25f37 5%, #cfb418 100%);
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  color: #11130d;
  font-size: 13px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  margin: 5px;
  max-width: 70%;
}
li:hover {
  background: linear-gradient(to bottom, #cfb418 5%, #e25f37 100%);
}
li:active {
  position: relative;
  top: 1px;
}

.demoButton {
  background: linear-gradient(to bottom, #e25f37 5%, #cfb418 100%);
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  max-width: 100%;
  max-height: 20%;
  text-align: center;
  margin: 4px;
}
.demoButton:hover {
  background: linear-gradient(to bottom, #cfb418 5%, #e25f37 100%);
}
.demoButton:active {
  position: relative;
  top: 1px;
}

@media screen and (max-width: 850px) {
  .headline {
    font-size: 2vw;
  }
  img {
    max-width: 15%;
  }
  .wrapper {
    max-height: 95%;
    width: 90%;
    margin-top: 0%;
  }
  ul li {
    max-height: 10%;
    max-width: 100%;
    font-size: 1.3vw;
  }
  .demoButton {
    font-size: 1.3vw;
  }
}
</style>
