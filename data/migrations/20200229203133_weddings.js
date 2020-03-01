
exports.up = function(knex) {
  return knex.schema.createTable('planners', tbl => {
      tbl.increments();

      tbl.string('username', 130).notNullable().unique().index();

      tbl.string('password', 130).notNullable();

      tbl.string('profile_pic', 130);

      tbl.string('home_location', 100).notNullable().index();

      tbl.string('email', 130).notNullable().unique().index();

  })

  .createTable('weddings', tbl => {
      tbl.increments();

      tbl.integer('planner_id').unsigned().notNullable().references('id').inTable('planners').onDelete('CASCADE').onDelete('CASCADE');

      tbl.string('wedding_name', 130).notNullable().index();

      tbl.string('wedding_photo', 130).notNullable().index();

      tbl.string('theme', 80).notNullable().index();

      tbl.string('wedding_location', 100).notNullable().index();

      tbl.string('description', 300).notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema    
    .dropTableIfExists('weddings')
    .dropTableIfExists('planners');
};
