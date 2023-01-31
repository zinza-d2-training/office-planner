import { MigrationWithTimestamps } from '@entities/config/migration-with-timestamps';

export class Migration20220723032502 extends MigrationWithTimestamps {
  override async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    const schema = knex.schema;
    await schema.createTable('users', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder.string('name', 255).notNullable();
      tableBuilder
        .string('email', 255)
        .notNullable()
        .comment('gmail, suffix: zinza.com.vn');
      tableBuilder
        .string('google_id', 255)
        .nullable()
        .comment('google account id');
      tableBuilder.text('avatar').nullable();
      tableBuilder
        .uuid('role_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('roles');
      tableBuilder.date('birthday').nullable();
      tableBuilder.string('position', 255).nullable();
      tableBuilder.string('job_title', 255).nullable();
      tableBuilder.jsonb('site_preferences').notNullable().defaultTo('{}');
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
    this.addSql(
      knex.raw(
        'CREATE UNIQUE INDEX users_email_unique_constraint ON users (email) WHERE deleted_at IS NULL'
      )
    );
    this.addSql(
      knex.raw(
        'CREATE UNIQUE INDEX users_google_id_unique_constraint ON users (google_id) WHERE deleted_at IS NULL'
      )
    );
    this.addSql(
      knex.raw(
        'CREATE UNIQUE INDEX users_github_username_unique_constraint ON users (github_username) WHERE deleted_at IS NULL'
      )
    );
  }

  override async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    const schema = knex.schema;
    await schema.dropTable('users');
  }
}
