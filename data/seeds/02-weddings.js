
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weddings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('weddings').insert([
        {id: 1, planner_id: 3, wedding_name: 'Scott Wedding', wedding_photo: 'https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', theme: 'Threat Level Midnight', wedding_location: 'Boulder CO', description: 'Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.'},

        {id: 2, planner_id: 2, wedding_name: 'Red Wedding', wedding_photo: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', theme: 'Blood Bath', wedding_location: 'Somewhere', description: 'Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.'},

        {id: 3, planner_id: 1, wedding_name: 'Smith Wedding', wedding_photo: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', theme: 'Vow Renewal', wedding_location: 'Chimdale Mountains', description: 'Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.'},

        {id: 4, planner_id: 3, wedding_name: 'Worf Son of Mogue Wedding', wedding_photo: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', theme: 'Klingon', wedding_location: 'Kronos', description: 'Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.'},

        {id: 5, planner_id: 2, wedding_name: 'Wallace Shawn', wedding_photo: 'https://images.pexels.com/photos/1199605/pexels-photo-1199605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', theme: 'Princess Bride', wedding_location: 'Dread Pirate Ship', description: 'Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.'}
      ]);
    });
};
