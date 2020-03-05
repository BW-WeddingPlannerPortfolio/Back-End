
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('planners').del()
    .then(function () {
      // Inserts seed entries
      return knex('planners').insert([
        {username: 'Gold Weddings', password: 'staygolden', profile_pic: 'https://images.unsplash.com/photo-1569948936239-908a7bc95edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Sunbeam, Colorado', email: 'weddingplannerextraordinaire@best.com'},
        {username: 'Frey Planners', password: 'jointhefrey', profile_pic: 'https://unsplash.com/photos/nC6CyrVBtkU', home_location: 'Twin Falls', email: 'jointhefrey@westeros.com'},
        {username: 'Amber Richards', password: 'vancerefrigeration', profile_pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Cleveland, OH', email: 'shopweddings@best.com'},
        {username: 'Lucas Weddings', password: 'lukerino', profile_pic: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Meridian Island', email: 'lucasweddings@wed.com'},
        {username: 'Perry Planners', password: 'employee1', profile_pic: 'https://images.unsplash.com/photo-1542822038-3a1810a5fb69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Edmonton, Alberta', email: 'perryplanning@plans.com'},

        {username: 'Starlight Weddings', password: 'starbright', profile_pic: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Darwin, Australia', email: 'starlightstarbright@aol.com'},

        {username: 'Patricia Peterson\'s Planning', password: 'trippleP', profile_pic: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Chimbote, Peru', email: 'PPP@planning.com'},

        {username: 'Floral Weddings', password: 'flowerpower', profile_pic: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', home_location: 'Casper, Wyoming', email: 'flowerseverywhere@weddings.com'}
      ]);
    });
};
