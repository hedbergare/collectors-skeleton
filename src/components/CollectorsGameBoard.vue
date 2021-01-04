<template>
  <div class="wrapper">
    <div class="Absolute-Center" v-if="this.infoText !== ''">
      <div class="infoPopup">
        <button @click="resetInfo()" class="close">X</button>
        <h2>{{ this.infoTitle }}</h2>
        <p>{{ this.infoText }}</p>
      </div>
    </div>
    <!-- Hela Spelbrädet -->

    <!-- Här gör vi card box Top -->
    <div class="cardBoxTop">
      <div
        class="itemsOnSaleIconCont"
        v-for="(card, index) in itemsOnSale"
        :key="index"
        @click="handleAction(card)"
      >
        <div class="itemsOnSaleIconCont1" v-if="card.item !== undefined">
          <img
            class="itemsOnSaleIcon"
            :src="'images/item_logos/' + card.item + '_item.png'"
          />
          <CollectorsCard
            :card="itemsOnSale[index]"
            :availableAction="card.available"
            id="itemsOnSalePic"
          />
        </div>
      </div>
    </div>

    <div class="itemBox">
      <!-- här gör vi pilarna till butItem -->

      <div id="itemArrow1">
        <img id="itemArrow1.1" src="/images/buyItemPic/ItemArrowGreen.png" />
      </div>
      <div id="itemArrow2">
        <img id="itemArrow1.2" src="/images/buyItemPic/ItemArrowRed.png" />
      </div>
      <div id="itemArrow3">
        <img id="itemArrow1.3" src="/images/buyItemPic/ItemArrowRed.png" />
      </div>
      <div id="itemArrow4">
        <img id="itemArrow1.4" src="/images/buyItemPic/ItemArrowRed.png" />
      </div>
      <div id="itemArrow5">
        <img id="itemArrow1.5" src="/images/buyItemPic/ItemArrowRed.png" />
      </div>
      <!-- <div></div> -->

      <!-- Här gör vi Item box med köprutor -->

      <div class="bottleItem" v-for="(p, index) in buyPlacement" :key="index">
        <button
          class="placeBottleItem"
          :disabled="cannotAffordItem(p.cost)"
          :style="
            'background-image: url(/images/bottelPic/Item_Bottle_' +
            p.cost +
            '.png);'
          "
          v-if="p.playerId === null"
          @click="placeBottle(p, 'item')"
        ></button>

        <button
          v-if="p.playerId !== null"
          disabled="true"
          class="placeBottleAuction1"
        >
          <CollectorsBottle :color="players[p.playerId].color" />
        </button>
      </div>
      <div id="buyItemBoxInfo">
        <img
          id="itemInfo"
          src="/images/buyItemPic/BuyItemInfo.png"
          style="cursor: pointer"
          @click="showInfoPopup(labels.itemsInfoTitle, labels.itemsInfo)"
        />
      </div>
    </div>

    <div class="skillBox">
      <!-- Här gör vi skill box med köprutor -->
      <!-- <div></div> -->
      <div id="buySkillInfo">
        <img
          id="skillButton"
          src="/images/buySkillPic/Skillsbutton.png"
          style="cursor: pointer"
          @click="showInfoPopup(labels.skillsInfoTitle, labels.skillsInfo)"
        />
      </div>
      <div
        class="bottleSkill"
        v-for="(p, index) in skillPlacement"
        :key="index"
      >
        <button
          class="placeBottleSkill"
          :disabled="cannotAffordSkill(p.cost)"
          v-if="p.playerId === null"
          :style="
            'background-image: url(/images/buySkillPic/skill_Bottle_' +
            p.cost +
            '.png);'
          "
          @click="placeBottle(p, 'skill')"
        ></button>

        <button
          v-if="p.playerId !== null"
          disabled="true"
          class="placeBottleAuction1"
        >
          <CollectorsBottle :color="players[p.playerId].color" />
        </button>
      </div>

      <!-- här gör vi pilarna till skillBox -->
      <div id="skillArrow1">
        <img id="skillArrow1.1" src="/images/buySkillPic/skillArrowGreen.png" />
      </div>
      <div id="skillArrow2">
        <img id="skillArrow1.2" src="/images/buySkillPic/skillArrowGreen.png" />
      </div>
      <div id="skillArrow3">
        <img id="skillArrow1.3" src="/images/buySkillPic/skillArrowGreen.png" />
      </div>
      <div id="skillArrow4">
        <img id="skillArrow1.4" src="/images/buySkillPic/skillArrowGreen.png" />
      </div>
      <div id="skillArrow5">
        <img id="skillArrow1.5" src="/images/buySkillPic/skillArrowBlue.png" />
      </div>
    </div>

    <div class="workBox">
      <!-- Här gör vi work box med köprutor -->
      <div id="buyWorkInfo">
        <img
          id="imageWork"
          src="/images/workPic/imageWork.png"
          style="cursor: pointer"
          @click="showInfoPopup(labels.workInfoTitle, labels.workInfo)"
        />
      </div>
      <div id="buyWorkBox1"></div>

      <div id="buyWorkBox2">
        <img id="qTile1" src="/images/workPic/qTile1.png" />
      </div>
      <div id="buyWorkBox3">
        <img id="qTile2" src="/images/workPic/qTile2.png" />
      </div>
      <div id="buyWorkBox4">
        <img id="qTile3" src="/images/workPic/qTile3.png" />
      </div>
      <div id="buyWorkBox5">
        <img id="qTile4" src="/images/workPic/qTile4.png" />
      </div>
    </div>

    <div class="auctionBox">
      <!-- Här gör vi auction box med flaskor -->
      <div id="auction2Boxes1">
        <div
          class="auctionBox1"
          v-for="(p, index) in auctionPlacement"
          :key="index"
        >
          <button
            class="placeBottleAuction1"
            :disabled="cannotAffordAuction(p.cost)"
            :style="
              'background-image: url(/images/auctionPic/auctionBottle_' +
              p.cost +
              '.png);'
            "
            v-if="p.playerId === null"
            @click="placeBottle(p, 'auction')"
          ></button>
          <button
            v-if="p.playerId !== null"
            disabled="true"
            class="placeBottleAuction1"
          >
            <CollectorsBottle :color="players[p.playerId].color" />
          </button>
        </div>
      </div>

      <!-- Här gör vi auction box med köprutor -->
      <div id="auctionArrow1">
        <img
          id="startAuction"
          style="cursor: pointer"
          src="/images/auctionPic/startAuctionImage.png"
          @click="showInfoPopup(labels.auctionInfoTitle, labels.auctionInfo)"
        />
      </div>
      <div id="auctionArrow2">
        <img id="auctionCards" src="/images/auctionPic/auctionCard.png" />
      </div>
      <div id="auctionArrow3">
        <!-- <CollectorsCard :card="auctionCards[0]"/> -->
        <img id="auctionCard1" src="/images/auctionPic/auctionArrowDown.png" />
      </div>
      <div id="auctionArrow4">
        <img id="auctionCard2" src="/images/auctionPic/auctionArrowBlue.png" />
        <!-- <CollectorsCard :card="auctionCards[1]"/> -->
      </div>
      <div id="auctionArrow5">
        <img id="auctionCard3" src="/images/auctionPic/auctionArrowLeft.png" />
        <!-- <CollectorsCard :card="auctionCards[2]"/> -->
      </div>
      <div id="auctionArrow6">
        <img id="auctionCard4" src="/images/auctionPic/auctionArrowLeft.png" />
        <!-- <CollectorsCard :card="auctionCards[3]"/> -->
      </div>
    </div>

    <div class="marketBox">
      <!-- Här gör vi market box med köprutor -->
      <div id="buyMarketBoxInfo">
        <img
          id="marketInfo"
          style="cursor: pointer"
          src="/images/marketPic/marketInfo.png"
          @click="showInfoPopup(labels.marketInfoTitle, labels.marketInfo)"
        />
      </div>
      <div
        class="bottleMarket"
        v-for="(p, index) in marketPlacement"
        :key="index"
      >
        <button
          class="placeBottleMarket"
          v-if="p.playerId === null"
          :disabled="cannotAffordMarket(p.cost)"
          :style="
            'background-image: url(/images/marketPic/marketBottle_' +
            p.cost +
            '.png);'
          "
          @click="placeBottle(p, 'market' + p.numCards,'ja')"
        ></button>
        <button
          v-if="p.playerId !== null"
          disabled="true"
          class="placeBottleAuction1"
        >
          <CollectorsBottle :color="players[p.playerId].color" />
        </button>
      </div>
      <div id="MarketArrow1">
        <img id="imagePingvin" src="/images/marketPic/image_fastaval.png" />
         <span class="marketValueText">{{ "x" + marketValues.fastaval }}</span>
      </div>
      <div id="MarketArrow2">
        <img id="imageRobot" src="/images/marketPic/image_figures.png" />
         <span class="marketValueText">{{ "x" + marketValues.figures }}</span>
      </div>
      <div id="MarketArrow3">
        <img id="imageMusik" src="/images/marketPic/image_music.png" />
        <span class="marketValueText">{{ "x" + marketValues.music }}</span>
      </div>
      <div id="MarketArrow4">
        <img id="imageFilm" src="/images/marketPic/image_movie.png" />
         <span class="marketValueText">{{ "x" + marketValues.movie }}</span>
      </div>
      <div id="MarketArrow5">
        <img id="imageTeknik" src="/images/marketPic/image_technology.png" />
         <span class="marketValueText">{{ "x" + marketValues.technology }}</span>
      </div>
    </div>

    <!-- Här gör vi card box Left -->

    <div class="cardBoxLeft">
      <div></div>
      <div
        class="skillsOnSaleIconCont"
        v-for="(card, index) in skillsOnSale"
        :key="index"
        @click="handleAction(card)"
      >
        <div class="skillsOnSaleCont" v-if="card.skill !== undefined">
          <img
            class="skillsOnSaleIcon"
            :src="'images/skill_logos/' + card.skill + '_skill.png'"
          />
          <CollectorsCard
            :card="skillsOnSale[index]"
            :availableAction="card.available"
            id="skillsOnSalePic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBottle from "@/components/CollectorsBottle.vue";

export default {
  name: "CollectorsGameBoard",
  components: {
    CollectorsCard,
    CollectorsBottle,
  },
  data: function () {
    return {
      infoText: "",
      infoTitle: "",
    };
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    auctionCards: Array,
    itemsOnSale: Array,
    marketValues: Object,
    buyPlacement: Array,
    auctionPlacement: Array,
    skillPlacement: Array,
    marketPlacement: Array,
    highlightCards: Boolean,
    players: Object,
  },

  watch: {
    highlightCards: function (h) {
      if (h) {
        this.highlightAvailableMarket();
      }
    },
  },

  methods: {
    resetInfo: function () {
      this.infoText = "";
    },
    handleAction: function (card) {
      if (card.available) {
        this.$emit("handleAction", card);
        this.updatePoints();
      }
    },
    showInfoPopup: function (title, text) {
      this.infoText = text;
      this.infoTitle = title;
    },

    highlightAvailableMarket: function () {
      /* Gör kortet längst ner i skillsonsale till avalible */
      for (let i = this.skillsOnSale.length - 1; i >= 0; i--) {
        if (typeof this.skillsOnSale[i].skill !== "undefined") {
          this.$set(this.skillsOnSale[i], "available", true);
          break;
        }
      }
      /* Gör korten på handen avalible */
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }
      /* Gör kortet längst ner i auction availble */
      for (let i = this.auctionCards.length - 1; i >= 0; i--) {
        if (typeof this.auctionCards[i].skill !== "undefined") {
          this.$set(this.auctionCards[i], "available", true);
          break;
        }
      }
    },

    cannotAffordMarket: function (cost) {
      if (this.player.money >= cost && this.player.isTurn) {
        return false;
      } else {
        return true;
      }
    },

    /*Skickar iväg att auktionen ska börja */
    initiateAuction() {
      this.$emit("initiateAuction");
    },
    /* Funktionen som hanterar hur många poäng varje spelare har */
    updatePoints: function () {
      this.$emit("updatePoints");
    },
    placeBottle: function (p, action) {
      this.$emit("placeBottle", {
        cost: p.cost,
        action: action,
        playerId: p.playerId,
      });
      if (action === "item") {
        this.highlightAvailableCards(p.cost);
      } else if (action === "skill") {
        this.highlightAvailableSkills(p.cost);
      } else if (action === "market2" || action === "market1") {
        console.log(action)
        this.highlightAvailableMarket(p.cost);
      } else if (action === "auction") {
        this.initiateAuction();
      }
    },

    highlightAvailableCards: function (cost) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (
          this.marketValues[this.itemsOnSale[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.itemsOnSale[i], "available", true);
          this.$set(this.placeBottleItem, "available", true);

        } else {
          this.$set(this.itemsOnSale[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }

      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (
          this.marketValues[this.player.hand[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.player.hand[i], "available", true);
        } else {
          this.$set(this.player.hand[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
    },

    cannotAffordItem: function (cost) {
      let minCost = 100;
      for (let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key];
      }
      if (this.player.money >= minCost && this.player.isTurn) {
        return false;
      } else {
        return true;
      }
    },

    cannotAffordAuction: function () {
      if (this.player.isTurn) {
        return false;
      } else {
        return true;
      }
    },

    /* Här är funktionerna till skills */
    buySkill: function (card) {
      if (card.available) {
        this.$emit("buySkill", card);
        this.updatePoints(); /* Även när man köper skills ska poängen uppdateras */
      }
    },

    highlightAvailableSkills: function (cost = 100) {
      /* Kollar på skillsen som ligger på brädet */
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        this.$set(this.skillsOnSale[i], "available", true);
      }
      this.chosenPlacementCost = cost;
      /* Kollar på skillsen som ligger på handen */
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }
      this.chosenPlacementCost = cost;
    },

    skillCost: function (card) {
      return this.placement[card];
    },

    cannotAffordSkill: function (cost) {
      if (this.player.money >= cost && this.player.isTurn ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
/* Main boxes */
.Absolute-Center {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  z-index: 10;
}
.infoPopup {
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color: #eae0c2;
  border-radius: 15px;
  border: 2px solid #333029;
  color: #505739;
  font-weight: bold;
  text-shadow: 0px 1px 0px #ffffff;
  padding: 5%;
  position: relative;
  max-width: 50%;
}
.infoPopup p {
  font-size: 80%;
}
.close {
  position: absolute;
  background: rgb(75, 0, 0);
  color: #d1c8ad;
  top: -2px;
  right: -2px;
  font-size: 160%;
  /* padding:10px; */
  border-radius: 10px;
  border: 2px solid black;
  cursor: pointer;
}
.wrapper {
  display: grid;
  position: relative;
  color: black;
  height: 100vh;
  grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 5% 15% 21% 21% 21% 17%;
}
.cardBoxTop {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 100%;
  max-width: 100%;
  color: white;
  grid-column: 2 / span 7;
  grid-row: 1;
}
.itemBox {
  grid-column: 2 / span 4;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 30% 70%;
  padding: 5px;
  text-align: center;
  max-width: 100%;
  background-color: rgb(247, 193, 230);
  color: white;
  margin: 5px;
  border-radius: 5px;
}
.cardBoxLeft {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 17% 17% 17% 17% 17%;
  max-width: 100%;
  color: white;
  grid-column: 1;
  grid-row: 3 / span 3;
}
.skillBox {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 15% 17% 17% 17% 17% 17%;
  padding: 5px;
  box-align: center;
  max-width: 100%;
  background-color: rgb(127, 241, 127);
  color: white;
  grid-column: 2;
  grid-row: 3 / span 3;
  margin: 2px;
  border-radius: 5px;
}
.workBox {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 17% 17% 17% 17% 17%;
  margin: 2px;
  max-width: 100%;
  background-color: rgb(243, 243, 125);
  color: white;
  grid-column: 3;
  grid-row: 3 / span 3;
  border-radius: 5px;
}
.auctionBox {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 33% 33% 33%;
  background-color: rgb(245, 179, 104);
  color: white;
  grid-column: 4 / span 2;
  grid-row: 3 / span 3;
  max-width: 100%;
  margin: 2px;
  border-radius: 5px;
}
.marketBox {
  display: grid;
  padding: 5px;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  background-color: rgb(189, 189, 241);
  color: white;
  grid-column: 2 / span 4;
  grid-row: 6;
  max-width: 100%;
  margin: 2px;
  border-radius: 5px;
}

.itemsOnSaleIcon {
  max-width: 50%;
}

.skillsOnSaleIcon {
  max-height: 40%;
  max-width: 100%;
}

.itemsOnSaleIconCont1,
.skillsOnSaleIconCont {
  max-height: 100%;
  text-align: center;
}

/* Flaskor till Item */

#itemInfo {
  max-width: 70%;
}

/* small boxes in itemBox */
.placeBottleItem {
  color: blue;
  width: 50%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
}
.bottleSkill {
  max-height: 100%;
  max-width: 100%;
}
.bottleItem {
  max-height: 100%;
}
.placeBottleSkill {
  color: blue;
  width: 70%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
}
.placeBottleMarket {
  color: blue;
  width: 50%;
  height: 90%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
}

#buyItemBoxInfo {
  color: black;
  grid-column: 6;
  grid-row: 1/3;
  max-width: 100%;
}
#buyItemBoxInfo img {
  max-width: 100%;
  max-height: 100%;
}

/* Pilar till Item */
#itemArrow1 {
  grid-column: 1;
  grid-row: 1;
  max-width: 100%;
  position: relative;
}

#itemArrow2 {
  grid-column: 2;
  grid-row: 1;
  max-width: 100%;
  position: relative;
}
#itemArrow3 {
  grid-column: 3;
  grid-row: 1;
  max-width: 100%;
  position: relative;
}
#itemArrow4 {
  grid-column: 4;
  grid-row: 1;
  max-width: 100%;
  position: relative;
}
#itemArrow5 {
  grid-column: 5;
  grid-row: 1;
  max-width: 100%;
}
#itemArrow1 img,
#itemArrow2 img,
#itemArrow3 img,
#itemArrow4 img,
#itemArrow5 img {
  max-width: 100%;
  max-height: 100%;
}

/* Small boxes in SkillBox */
#buySkillInfo {
  grid-column: 1/3;
  grid-row: 1;
  max-width: 100%;
}
#skillButton {
  max-width: 100%;
  max-height: 100%;
}

/* Pilarna i Skillbox */

#skillArrow1 {
  text-align: left;
  grid-column: 1;
  grid-row: 2;
  max-width: 100%;
}
#skillArrow2 {
  text-align: left;
  grid-column: 1;
  grid-row: 3;
  max-width: 100%;
}
#skillArrow3 {
  text-align: left;
  grid-column: 1;
  grid-row: 4;
  max-width: 100%;
}
#skillArrow4 {
  text-align: left;
  grid-column: 1;
  grid-row: 5;
  max-width: 100%;
}
#skillArrow5 {
  text-align: left;
  grid-column: 1;
  grid-row: 6;
  max-width: 100%;
}

#skillArrow1 img,
#skillArrow2 img,
#skillArrow3 img,
#skillArrow4 img,
#skillArrow5 img {
  max-width: 100%;
}

/* Small boxes in WorkBox */
#buyWorkInfo {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
#buyWorkBox1 {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 2;
  max-width: 100%;
}
#buyWorkBox2 {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 3;
  max-width: 100%;
}
#buyWorkBox3 {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 4;
  max-width: 100%;
}
#buyWorkBox4 {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 5;
  max-width: 100%;
}
#buyWorkBox5 {
  text-align: center;
  border: solid 1px;
  color: black;
  grid-row: 6;
  max-width: 100%;
}

#buyWorkInfo img,
#buyWorkBox1 img,
#buyWorkBox2 img,
#buyWorkBox3 img,
#buyWorkBox4 img,
#buyWorkBox5 img {
  max-width: 100%;
  max-height: 100%;
}

/* Small boxes in auctionBox */
.placeBottleAuction1 {
  color: blue;
  width: 65%;
  height: 90%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
}
.auctionBox1 {
  height: 100%;
}

#auction2Boxes1 {
  grid-column: 1/3;
  grid-row: 2;
  grid-template-rows: 50% 50%;
  grid-template-columns: 1fr 1fr;
  display: grid;
  max-width: 100%;
  max-height: 100%;
  padding: 5%;
}
.placeBottleAuction1 > * {
  max-height: 100%;
  max-width: 100%;
}

/* Pilar i auctionbox */
#auctionArrow1 {
  grid-column: 1/3;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
#auctionArrow2 {
  grid-column: 3;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
#auctionArrow3 {
  grid-column: 3;
  grid-row: 2;
  max-width: 100%;
  max-height: 100%;
}
#auctionArrow4 {
  grid-column: 1;
  grid-row: 3;
  max-width: 100%;
  max-height: 100%;
}
#auctionArrow5 {
  grid-column: 2;
  grid-row: 3;
  max-width: 100%;
  max-height: 100%;
}
#auctionArrow6 {
  grid-column: 3;
  grid-row: 3;
  max-width: 100%;
  max-height: 100%;
}

/* Här kommer scaling för auctioncards vara sedan som automatiskt har klassen card */
/* Ta tillbaka transform scale om korten är ivägen */
.card {
  /*  top: 0;
  left: 0;*/
  /*   transform: scale(0.3, 0.3);
 */
  transform-origin: center;
  /*   margin-top: -105%;
  margin-left: -75px;  */
  position: absolute;
}
#auctionArrow1 img,
#auctionArrow2 img,
#auctionArrow3 img,
#auctionArrow4 img,
#auctionArrow5 img,
#auctionArrow6 img {
  max-width: 100%;
  max-height: 100%;
}

#auctionCards {
  width: 70%;
  padding-top: 20%;
}

/* Small boxes in MarketBox */

#MarketArrow1 {
  border: dashed 2px black;
  grid-column: 1;
  grid-row: 2;
}
#MarketArrow2 {
  border: dashed 2px black;
  grid-column: 2;
  grid-row: 2;
}
#MarketArrow3 {
  border: dashed 2px black;
  grid-column: 3;
  grid-row: 2;
}
#MarketArrow4 {
  border: dashed 2px black;
  grid-column: 4;
  grid-row: 2;
}
#MarketArrow5 {
  border: dashed 2px black;
  grid-column: 5;
  grid-row: 2;
}
.marketValueText{
  vertical-align:top;
  font-size:120%;
}

/* Bilder till Market Value */
#imageTeknik,
#imageFilm,
#imageMusik,
#imageRobot,
#imagePingvin,
#marketInfo {
  max-width: 100%;
  max-height: 100%;
}

.itemsOnSaleIcon:hover + #itemsOnSalePic {
  display: inline-block;
  width: 250px;
  height: 350px;
  transform: scale(0.5) translate(-50%, -50%);
}
#itemsOnSalePic {
  position: absolute;
  display: none;
  width: 90%;
}
.skillsOnSaleIcon:hover + #skillsOnSalePic {
  display: inline-block;
  width: 250px;
  height: 350px;
  transform: scale(0.5) translate(-50%, -50%);
}
#skillsOnSalePic {
  position: absolute;
  display: none;
  width: 50%;
}
/* Här skriver vi den css som bara ska gälla för mobilversion (när skärmen är mindre än 800px) */
@media screen and (max-width: 800px) {
}
</style>
