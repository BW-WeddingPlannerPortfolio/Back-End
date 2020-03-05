
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weddings').del()
    .then(function () {
      // Inserts seed entries
      return knex('weddings').insert([
        {id: 1, planner_id: 1, wedding_name: 'Romez-Woods Wedding', wedding_photo: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', theme: 'Sunrise', wedding_location: 'Boulder, CO', description: 'The perfect wedding day exists. With the sinrise above and guests all around, this wedding was flawless.'},

        {id: 2, planner_id: 2, wedding_name: 'Lyons\' Family Wedding', wedding_photo: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', theme: 'Traditional', wedding_location: 'Twin Falls', description: 'Perfect wedding location with a waterfall to provide a beautiful backdrop.'},
        {id: 3, planner_id: 2, wedding_name: 'Couple Wedding', wedding_photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Outdoor', wedding_location: 'Twin Falls', description: 'Perfect wedding location with a waterfall to provide a beautiful backdrop.'},
        {id: 4, planner_id: 3, wedding_name: 'Curtis-Stokes Wedding', wedding_photo: 'https://images.unsplash.com/photo-1563339037-84fb4e623969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'New Beginnings', wedding_location: 'Lake Erie', description: 'Right after this wedding the entire guest list was able to enjoy a Cleveland Browns game without needing to walk far.'},

        {id: 5, planner_id: 4, wedding_name: 'Fox-Craig Wedding', wedding_photo: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Indoor', wedding_location: 'Meridian Island', description: 'Congratulations to the happy couple!'},

        {id: 6, planner_id: 5, wedding_name: 'Anderson Wedding', wedding_photo: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Rustic', wedding_location: 'Edmonton', description: 'Outdoor Wedding'},

        {id: 7, planner_id: 6, wedding_name: 'Morris-Bisshop Wedding', wedding_photo: 'https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Night Time', wedding_location: 'Darwin, Australia', description: 'With our aim to make night-time weddings more popular, this wedding shows that it can be done well. '},

        {id: 8, planner_id: 6, wedding_name: 'Quinlan Wedding', wedding_photo: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Night Time', wedding_location: 'Cairns, Australia', description: 'With our aim to make night-time weddings more popular, this wedding shows that it can be done well and still have and "indoor-like" feel through the use of tents.'},

        {id: 9, planner_id: 7, wedding_name: 'True-Magana Wedding', wedding_photo: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Outdoor', wedding_location: 'Chimbote, Peru', description: 'A lovely couple with a lovely wedding!'},

        {id: 10, planner_id: 8, wedding_name: 'Thibodeau Wedding', wedding_photo: 'https://images.unsplash.com/photo-1508839370228-5ae14793c2f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', theme: 'Traditional', wedding_location: 'Meridian Island', description: 'This destination wedding was the perfect chance for a vaction and wedding for all involved.'},

        {id: 11, planner_id: 1, wedding_name: 'Terell-Orozco Wedding', wedding_photo: 'https://images.unsplash.com/photo-1505513699077-1c91b82a7407?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', theme: 'Outdoor', wedding_location: 'Trinidad, Colorado', description: 'Even with the rain, this was a lovely wedding!'},

        {id: 12, planner_id: 5, wedding_name: 'Murphy Wedding', wedding_photo: 'https://images.unsplash.com/photo-1528115024996-260f89b6335f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=642&q=80', theme: 'Traditions Never Cease', wedding_location: 'Swan Hills, Alberta', description: 'This beautiful wedding was filled with so much love. The dancefloor was packed for the celebration! Congratulations Murphy\'s'},
        
      ]);
    });
};
