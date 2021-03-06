function sockets(io, socket, data) {
  socket.on('setupCollectors', function (d) {
    data.createRoom(d.roomId, d.playerCount, d.lang);
  })
  socket.on('collectorsLoaded', function (d) {
    socket.join(d.roomId);
    if (data.joinGame(d.roomId, d.playerId)) {
      io.to(d.roomId).emit('collectorsInitialize', {
        labels: data.getUILabels(d.roomId),
        players: data.getPlayers(d.roomId),
        itemsOnSale: data.getItemsOnSale(d.roomId),
        marketValues: data.getMarketValues(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        placements: data.getPlacements(d.roomId)
      }
      );
    }
  });
  socket.on('collectorsDrawCard', function (d) {
    io.to(d.roomId).emit('collectorsCardDrawn',
      data.drawCard(d.roomId, d.playerId)
    );
  });

  socket.on('collectorsBuyCard', function (d) {
    data.buyCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsCardBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      itemsOnSale: data.getItemsOnSale(d.roomId)
    }
    );
  });
  socket.on('collectorsBuyMarket', function (d) {
    data.buyMarket(d.roomId, d.playerId, d.card, d.cost, d.action)
    io.to(d.roomId).emit('collectorsMarketBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
    }
    );
  });

  socket.on('collectorsBuySkills', function (d) {
    data.buySkill(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsSkillBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId),

    }
    );
  });

  socket.on('collectorsPlaceBottle', function (d) {

    data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.id);
    io.to(d.roomId).emit('collectorsBottlePlaced', {
      placements: data.getPlacements(d.roomId),
      players: data.getPlayers(d.roomId),
      playerId: d.playerId,
      id: d.id,
    }

    );
  });


  socket.on('fillPools', function (d) {
    data.fillPools(d.roomId);
    io.to(d.roomId).emit('collectorsPoolsFilled', {
      skillsOnSale: data.getSkillsOnSale(d.roomId),
      itemsOnSale: data.getItemsOnSale(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      placements: data.getPlacements(d.roomId),
      roundCounter: data.getRoundCounter(d.roomId),
      players: data.getPlayers(d.roomId),
    });
  });
  socket.on('handleWorkActions', function (d) {
    data.handleWorkActions(d.roomId, d.playerId, d.cost, d.workId);
    io.to(d.roomId).emit('workActionDone', {
      players: data.getPlayers(d.roomId),
      playerId: d.playerId,
      id: d.workId
    });
  });
  socket.on('collectorsInsertIncome', function (d) {
    data.insertIncomeCard(d.roomId, d.playerId, d.card);
    io.to(d.roomId).emit('incomeCardInserted', {
      players: data.getPlayers(d.roomId),
      playerId: d.playerId,
    });
  });
  socket.on('changeTurn', function (d) {
    data.turnChanged(d.players, d.roomId);
    io.to(d.roomId).emit('turnChanged', {
      players: data.getPlayers(d.roomId),
    })
  });
  socket.on('startAuction', function (d) {
    data.startAuction(d.roomId, d.cardUpForAuction, d.playerId, d.cost);
    io.to(d.roomId).emit('auctionStarted', {
      cardUpForAuction: data.getCardUpForAuction(d.roomId),
      players: data.getPlayers(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      playerId: d.playerId,
      cost: d.cost,
    })
  });
  socket.on('winnerPlaceCard', function (d) {
    data.winnerPlaceCard(d.roomId, d.playerId, d.placement);
    io.to(d.roomId).emit('auctionDone', {
      cardUpForAuction: data.getCardUpForAuction(d.roomId),
      players: data.getPlayers(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      auctionWinner: data.getAuctionWinner(d.roomId),
      leadingBet: data.getLeadingBet(d.roomId),
    })
  });
  socket.on('updatePlayers', function (d) {
    data.updatePlayers(d.players, d.roomId);
    io.to(d.roomId).emit('playersUpdated', {
      players: data.getPlayers(d.roomId),
    })
  });
  socket.on('updateLeadingBet', function (d) {
    data.updateLeadingBet(d.leadingBet, d.roomId);
    io.to(d.roomId).emit('leadingBetUpdated', {
      leadingBet: data.getLeadingBet(d.roomId),
    })
  });
  socket.on('setAuctionWinner', function (d) {
    data.setAuctionWinner(d.roomId, d.playerId);
    io.to(d.roomId).emit('auctionWinnerSet', {
      auctionWinner: data.getAuctionWinner(d.roomId),
    })
  });
  socket.on('collectorsUpdatePoints', function (d) {
    data.updatePoints(d.roomId),
      io.to(d.roomId).emit('collectorsPointsUpdated', {
        players: data.getPlayers(d.roomId)
      })
  });
}

module.exports = sockets;