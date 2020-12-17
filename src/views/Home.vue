<template>
  <div class="center">
    <div class="wrapper">
      <div style="margin:0 auto;">
      <h1>Welcome to Collectors</h1>
      <p>- a worker-placement boardgame for everyone all ages!</p>

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
  },
};
</script>
<style scoped>
img {
  max-width: 10%;
}
.center {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 1em;
}
.wrapper {
  background-color: rgb(241, 174, 87);
  color: white;
  margin:0 auto;
  width: 50%;
  margin-top: 5%;
  padding: 0 10%;
  max-height: 80%;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
}
ul {
  padding: 0;
  margin:0 auto;
}
ul li {
  margin:0 auto;
  list-style-type: none;
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color: #eae0c2;
  border-radius: 15px;
  border: 2px solid #333029;
  cursor: pointer;
  color: #505739;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  margin: 5px;
  max-width: 50%;
}
li:hover {
  background: linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color: #ccc2a6;
}
li:active {
  position: relative;
  top: 1px;
}
@media screen and (max-width: 800px) {
  .wrapper {
    max-height: none;
    width: 90%;
  }
}
</style>
