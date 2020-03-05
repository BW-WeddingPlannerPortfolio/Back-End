
exports.up = function(knex) {
  return knex.schema.createTable('planners', tbl => {
      tbl.increments();

      tbl.string('username', 130).notNullable().unique().index();

      tbl.string('password', 130).notNullable();

      tbl.text('profile_pic');

      tbl.string('home_location', 100).notNullable().index();

      tbl.string('email', 130).notNullable().unique().index();

  })

  .createTable('weddings', tbl => {
      tbl.increments();

      tbl.integer('planner_id').unsigned().notNullable().references('id').inTable('planners').onDelete('CASCADE').onDelete('CASCADE');

      tbl.string('wedding_name', 300).notNullable().index();

      tbl.text('wedding_photo').notNullable().index();

      tbl.string('theme', 100).notNullable().index();

      tbl.string('wedding_location', 200).notNullable().index();

      tbl.text('description').notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema    
    .dropTableIfExists('weddings')
    .dropTableIfExists('planners');
};
