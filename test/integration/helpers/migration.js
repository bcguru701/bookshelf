var _ = require('lodash');
var Promise = global.testPromise;

var drops = [
  'sites', 'sitesmeta', 'admins',
  'admins_sites', 'authors', 'authors_posts',
  'blogs', 'posts', 'tags', 'posts_tags', 'comments',
  'users', 'roles', 'photos', 'users_roles', 'info',
  'Customer', 'Settings', 'hostnames', 'instances', 'uuid_test',
  'parsed_users', 'tokens'
];

module.exports = function(Bookshelf) {

  var schema = Bookshelf.knex.schema;

  return Promise.all(_.map(drops, function(val) {
    return schema.dropTableIfExists(val);
  }))
  .then(function() {

    return Promise.all([
      schema.createTable('sites', function(table) {
        table.increments('id');
        table.string('name');
      }),

      schema.createTable('sitesmeta', function(table) {
        table.increments('id');
        table.integer('site_id').notNullable();
        table.text('description');
      }),

      schema.createTable('info', function(table) {
        table.increments('id');
        table.integer('meta_id').notNullable();
        table.text('other_description');
      }),

      schema.createTable('admins', function(table) {
        table.increments('id');
        table.string('username');
        table.string('password');
        table.timestamps();
      }),

      schema.createTable('admins_sites', function(table) {
        table.increments('id');
        table.integer('admin_id').notNullable();
        table.integer('site_id').notNullable();
        table.string('item').defaultTo('test');
      }),

      schema.createTable('blogs', function(table) {
        table.increments('id');
        table.integer('site_id').notNullable();
        table.string('name');
      }),

      schema.createTable('authors', function(table) {
        table.increments('id');
        table.integer('site_id').notNullable();
        table.string('first_name');
        table.string('last_name');
      }),

      schema.createTable('posts', function(table) {
        table.increments('id');
        table.integer('owner_id').notNullable();
        table.integer('blog_id').notNullable();
        table.string('name');
        table.text('content');
      }),

      schema.createTable('authors_posts', function(table) {
        table.increments('id');
        table.integer('author_id').notNullable();
        table.integer('post_id').notNullable();
      }),

      schema.createTable('tags', function(table) {
        table.increments('id');
        table.string('name');
      }),

      schema.createTable('posts_tags', function(table) {
        table.increments('id');
        table.integer('post_id').notNullable();
        table.integer('tag_id').notNullable();
      }),

      schema.createTable('comments', function(table) {
        table.increments('id');
        table.integer('post_id').notNullable();
        table.string('name');
        table.string('email');
        table.text('comment');
      }),

      schema.createTable('users', function(table) {
        table.increments('uid');
        table.string('username');
      }),

      schema.createTable('roles', function(table) {
        table.increments('rid');
        table.string('name');
      }),

      schema.createTable('users_roles', function(table) {
        table.integer('rid').notNullable();
        table.integer('uid').notNullable();
      }),

      schema.createTable('photos', function(table) {
        table.increments('id');
        table.string('url');
        table.string('caption');
        table.integer('imageable_id').notNullable();
        table.string('imageable_type');
      }),

      schema.createTable('Customer', function(table) {
        table.increments('id');
        table.string('name');
      }),

      schema.createTable('Settings', function(table) {
        table.increments('id');
        table.integer('Customer_id').notNullable();
        table.string('data', 64);
      }),

      schema.createTable('hostnames', function(table){
        table.string('hostname');
        table.integer('instance_id').notNullable();
        table.enu('route', ['annotate','submit']);
      }),

      schema.createTable('instances', function(table){
        table.bigIncrements('id');
        table.string('name');
      }),

      schema.createTable('uuid_test', function(table) {
        table.uuid('uuid');
        table.string('name');
      }),

      schema.createTable('parsed_users', function(table) {
        table.increments();
        table.string('name');
      }),

      schema.createTable('tokens', function(table) {
        table.increments();
        table.string('parsed_user_id');
        table.string('token');
      })

    ]);

  });

};