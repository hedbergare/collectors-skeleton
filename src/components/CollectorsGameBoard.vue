<template>
  <div class="wrapper">
    <!-- Hela Spelbrädet -->

    <!-- Här gör vi card box Top -->
    <div class="cardBoxTop">
      <div
        class="itemsOnSaleIconCont"
        v-for="(card, index) in itemsOnSale"
        :key="index"
        @click="buyCard(card)"
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
      <div></div>

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

        <div v-if="p.playerId !== null">
          {{ p.playerId }}
        </div>
      </div>
      <div id="buyItemBoxInfo">
        <img id="itemInfo" src="/images/buyItemPic/BuyItemInfo.png" />
      </div>
    </div>

    <div class="skillBox">
      <!-- Här gör vi skill box med köprutor -->
      <div></div>
      <div id="buySkillInfo">
        <img id="skillButton" src="/images/buySkillPic/Skillsbutton.png" />
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

        <div v-if="p.playerId !== null">
          {{ p.playerId }}
        </div>
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
        <img id="imageWork" src="/images/workPic/imageWork.png" />
      </div>
      <div id="buyWorkBox1">Här ska de bytas varje omgång</div>
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
          v-for="(p, index) in buyPlacement"
          :key="index"
        >
          <button
            class="placeBottleAuction1"
            :disabled="cannotAffordAuction(p.cost)"
            :style="'background-image: url(/images/auctionPic/auctionBottle1.png);'"
            v-if="p.playerId === null"
            @click="placeBottle(p, 'item')"
          ></button>
        </div>

        <div
          class="auctionBox2"
          v-for="(p, index) in buyPlacement"
          :key="index"
        >
          <button
            class="placeBottleAuction2"
            :disabled="cannotAffordAuction(p.cost)"
            :style="'background-image: url(/images/auctionPic/auctionBottle2.png);'"
            v-if="p.playerId === null"
            @click="placeBottle(p, 'item')"
          ></button>
        </div>
      </div>

      <div id="auction2Boxes2">
        <div
          class="auctionBox3"
          v-for="(p, index) in buyPlacement"
          :key="index"
        >
          <button
            class="placeBottleAuction3"
            :disabled="cannotAffordAuction(p.cost)"
            :style="'background-image: url(/images/auctionPic/auctionBottle3.png);'"
            v-if="p.playerId === null"
            @click="placeBottle(p, 'item')"
          ></button>
        </div>

        <div
          class="auctionBox4"
          v-for="(p, index) in buyPlacement"
          :key="index"
        >
          <button
            class="placeBottleAuction4"
            :disabled="cannotAffordAuction(p.cost)"
            :style="'background-image: url(/images/auctionPic/auctionBottle3.png);'"
            v-if="p.playerId === null"
            @click="placeBottle(p, 'item')"
          ></button>
        </div>
      </div>

      <!-- Här gör vi auction box med köprutor -->
      <div id="auctionArrow1">
        <img id="startAuction" src="/images/auctionPic/startAuctionImage.png" />
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
      <div id="buyMarketBox1">
        <img id="marketBottle1" src="/images/marketPic/marketBottle1.png" />
      </div>
      <div id="buyMarketBox2">
        <img id="marketBottle2" src="/images/marketPic/marketBottle2.png" />
      </div>
      <div id="buyMarketBox3">
        <img id="marketBottle3" src="/images/marketPic/marketBottle3.png" />
      </div>
      <div id="buyMarketBoxInfo">
        <img id="marketInfo" src="/images/marketPic/marketInfo.png" />
        <img id="testhover" src="/images/marketPic/info.png" />
      </div>
      <div id="MarketArrow1">
        <img id="imagePingvin" src="/images/marketPic/image_fastaval.png" />
      </div>
      <div id="MarketArrow2">
        <img id="imageRobot" src="/images/marketPic/image_figures.png" />
      </div>
      <div id="MarketArrow3">
        <img id="imageMusik" src="/images/marketPic/image_music.png" />
      </div>
      <div id="MarketArrow4">
        <img id="imageFilm" src="/images/marketPic/image_movie.png" />
      </div>
      <div id="MarketArrow5">
        <img id="imageTeknik" src="/images/marketPic/image_technology.png" />
      </div>
    </div>

    <!-- Här gör vi card box Left -->

    <div class="cardBoxLeft">
      <div></div>
      <div
        class="skillsOnSaleIconCont"
        v-for="(card, index) in skillsOnSale"
        :key="index"
        @click="buySkill(card)"
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

export default {
  name: "CollectorsGameBoard",
  components: {
    CollectorsCard,
  },

  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    auctionCards: Array,
    itemsOnSale: Array,
    marketValues: Object,
    buyPlacement: Array,
    skillPlacement: Array,
  },
  methods: {
    /* Här är funktionerna till item */
    buyCard: function (card) {
      if (card.available) {
        this.$emit("buyCard", card);
        this.updatePoints();
      }
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
      }
    },

    highlightAvailableCards: function (cost = 100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (
          this.marketValues[this.itemsOnSale[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.itemsOnSale[i], "available", true);
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
          this.chosenPlacementCost = cost;
        } else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
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

    cannotAffordAuction: function (cost) {
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
      if (this.player.money >= cost && this.player.isTurn) {
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

.wrapper {
  margin: auto;
  display: grid;
  color: black;
  width: 100%;
  height: 100vh;
  grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 5vh 15vh 21vh 21vh 21vh 17vh;
  margin-bottom: 60px;
}
.itemBox {
  grid-column: 2 / span 4;
  grid-row: 2;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: 5vh 7.5vh;
  padding: 5px;
  text-align: center;
  max-width: 100%;
  background-color: rgb(247, 193, 230);
  color: white;
}
.skillBox {
  display: grid;
  text-align: center;
  grid-template-columns: auto auto;
  grid-template-rows: 7vh 11vh 11vh 11vh 11vh 11vh;
  padding: 5px;
  box-align: center;
  max-width: 100%;
  background-color: rgb(127, 241, 127);
  color: white;
  grid-column: 2;
  grid-row: 3 / span 3;
}
.workBox {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 8vh 9vh 11vh 11vh 11vh 11vh;
  padding: 5px;
  max-width: 100%;
  background-color: rgb(243, 243, 125);
  color: white;
  grid-column: 3;
  grid-row: 3 / span 3;
}
.auctionBox {
  display: grid;
  text-align: center;
  grid-template-columns: auto auto auto;
  grid-template-rows: 20vh 20vh 20vh;
  background-color: rgb(245, 179, 104);
  color: white;
  grid-column: 4 / span 2;
  grid-row: 3 / span 3;
  max-width: 100%;
}
.marketBox {
  display: grid;
  padding: 11px;
  text-align: center;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: 7vh 6vh;
  background-color: rgb(189, 189, 241);
  color: white;
  grid-column: 2 / span 4;
  grid-row: 6;
  max-width: 100%;
}
.cardBoxLeft {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10vh 10vh 10vh 10vh 10vh 10vh;
  max-width: 100%;
  color: white;
  grid-column: 1;
  grid-row: 3 / span 3;
  grid-auto-rows: max-content;
}
.cardBoxTop {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 5vh;
  max-width: 100%;
  color: white;
  grid-column: 2 / span 7;
  grid-row: 1;
}
.itemsOnSaleIcon {
  max-height: 5vh;
  max-width: 100%;
}
.skillsOnSaleIcon {
  max-height: 30vh;
  max-width: 100%;
}
.itemsOnSaleIconCont1,
.skillsOnSaleIconCont {
  max-height: 100%;
  text-align: center;
}

/* Flaskor till Item */
#bottle1,
#itemBottle2,
#itemBottle3 {
  max-width: 50%;
}
#itemInfo {
  max-width: 70%;
}

/* small boxes in itemBox */
.placeBottleItem {
  color: blue;
  background-image: url(/images/bottelPic/Bottle.png);
  width: 50%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

.placeBottleSkill {
  color: blue;
  background-image: url(/images/buySkillPic/skill_Bottle1.png);
  width: 70%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
}

#buyItemBoxInfo {
  color: black;
  grid-column: 6;
  grid-row: 2;
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
.bottleSkill {
  color: blue;
  padding: 8px;
}

#skillButton,
#skillBottle1,
#skillBottle2,
#skillBottle3,
#skillBottle4,
#skillBottle5 {
  max-width: 100%;
  max-height: 100%;
}

/* Small boxes in SkillBox */
#buySkillInfo {
  grid-column: 2;
  grid-row: 1;
  max-width: 100%;
}
#buySkillBox1 {
  grid-column: 2;
  grid-row: 2;
  max-width: 100%;
}

#buySkillBox2 {
  grid-column: 2;
  grid-row: 3;
  max-width: 100%;
}

#buySkillBox3 {
  grid-column: 2;
  grid-row: 4;
  max-width: 100%;
}

#buySkillBox4 {
  grid-column: 2;
  grid-row: 5;
  max-width: 100%;
}

#buySkillBox5 {
  grid-column: 2;
  grid-row: 6;
  max-width: 100%;
}

#buySkillBox1 img,
#buySkillBox2 img,
#buySkillBox3 img,
#buySkillBox4 img,
#buySkillBox5 img {
  max-width: 100%;
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
  border: dashed 1px;
  color: black;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
#buyWorkBox1 {
  text-align: center;
  border: dashed 1px;
  color: black;
  grid-row: 2;
  max-width: 100%;
}
#buyWorkBox2 {
  text-align: center;
  border: dashed 1px;
  color: black;
  grid-row: 3;
  max-width: 100%;
}
#buyWorkBox3 {
  text-align: center;
  border: dashed 1px;
  color: black;
  grid-row: 4;
  max-width: 100%;
}
#buyWorkBox4 {
  text-align: center;
  border: dashed 1px;
  color: black;
  grid-row: 5;
  max-width: 100%;
}
#buyWorkBox5 {
  text-align: center;
  border: dashed 1px;
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
  background-image: url(/images/auctionPic/auctionBottle1.png);
  width: 50%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
}
.placeBottleAuction2 {
  color: blue;
  background-image: url(/images/auctionPic/auctionBottle2.png);
  width: 50%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
}
.placeBottleAuction3 {
  color: blue;
  background-image: url(/images/auctionPic/auctionBottle3.png);
  width: 50%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
}
.placeBottleAuction4 {
  color: blue;
  background-image: url(/images/auctionPic/auctionBottle3.png);
  width: 50%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
}

#auction2Boxes1 {
  grid-template-rows: 10vh 10vh;
  display: grid;
  grid-column: 1;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
.auctionBox1 {
  grid-column: 1;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
.auctionBox2 {
  grid-column: 1;
  grid-row: 2;
  max-width: 100%;
  max-height: 100%;
}
#auctionBox1 img,
#auctionBox2 img,
#auctionBox3 img,
#auctionBox4 img,
#startAuction img {
  max-width: 100%;
  max-height: 100%;
}
#auction2Boxes2 {
  grid-template-rows: 10vh 10vh;
  display: grid;
  grid-column: 1;
  grid-row: 2;
  max-width: 100%;
  max-height: 100%;
}
.auctionBox3 {
  grid-column: 1;
  grid-row: 1;
  max-width: 100%;
  max-height: 100%;
}
.auctionBox4 {
  grid-column: 1;
  grid-row: 2;
  max-width: 100%;
  max-height: 100%;
}

/* Pilar i auctionbox */
#auctionArrow1 {
  grid-column: 2;
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

/* Small boxes in MarketBox */
#buyMarketInfo {
  grid-column: 1;
  grid-row: 1;
}
#buyMarketBox1 {
  grid-column: 2;
  grid-row: 1;
}
#buyMarketBox2 {
  grid-column: 3;
  grid-row: 1;
}
#buyMarketBox3 {
  grid-column: 4;
  grid-row: 1;
}
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

/* Bilder till Market Value */
#imageTeknik,
#imageFilm,
#imageMusik,
#imageRobot,
#imagePingvin,
#marketInfo,
#marketBottle3,
#marketBottle2,
#marketBottle1 {
  max-width: 100%;
  max-height: 100%;
}

#marketInfo:hover + #testhover {
  display: inline-block;
  height: 20vh;
  width: 25vh; 
}
#testhover {
  position: absolute;
  display: none;
  width: 90%;
}
.itemsOnSaleIcon:hover + #itemsOnSalePic {
  display: inline-block;
  height: 43vh;
  width: 30vh;
}
#itemsOnSalePic {
  position: absolute;
  display: none;
  width: 90%;
}
.skillsOnSaleIcon:hover + #skillsOnSalePic {
  display: inline-block;
  height: 43vh;
  width: 30vh;
}
#skillsOnSalePic {
  position: absolute;
  display: none;
  width: 90%;
}
</style>
