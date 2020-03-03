
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('planners').del()
    .then(function () {
      // Inserts seed entries
      return knex('planners').insert([
        {id: 1, username: 'Jeanie Gold', password: 'password1', profile_pic: 'https://vignette.wikia.nocookie.net/rogersmith/images/f/f4/Picture_13.png/revision/latest/scale-to-width-down/340?cb=20111010150446', home_location: 'Langley Falls', email: 'weddingplannerextraordinaire@best.com'},
        {id: 2, username: 'Walder Frey', password: 'jointhefrey', profile_pic: 'https://cdn.discordapp.com/attachments/226727358634131456/683770723256631323/2Q.png', home_location: 'The Twins', email: 'jointhefrey@westeros.com'},
        {id: 3, username: 'Bob Vance', password: 'vancerefrigeration', profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJgFDQqbXlc4zyIISRPJbZ8LSjTz8VCdYdmpOmuNkr_I-lczFs', home_location: 'Scranton PA', email: 'bobvance@vancerefrigeration.com'},
      ]);
    });
};
