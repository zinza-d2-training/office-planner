import { Migration } from '@mikro-orm/migrations';
import { Knex } from 'knex';

export class MigrationWithTimestamps extends Migration {
  getKnexBuilder() {
    return this.ctx ?? this.driver.getConnection('write').getKnex();
  }

  addUuidPrimaryColumn(tableBuilder: Knex.CreateTableBuilder) {
    tableBuilder
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(this.getKnexBuilder().raw('gen_random_uuid()'));
  }

  addTimestampColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder
      .dateTime('created_at', { useTz: true })
      .nullable()
      .defaultTo('now()');
    tableBuilder
      .dateTime('updated_at', { useTz: true })
      .nullable()
      .defaultTo('now()');
  }

  addSoftDeleteColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder.dateTime('deleted_at', { useTz: true }).nullable();
  }

  addActorColumns(tableBuilder: Knex.CreateTableBuilder): void {
    tableBuilder
      .uuid('created_by')
      .nullable()
      .index()
      .references('id')
      .inTable('users');
    tableBuilder
      .uuid('updated_by')
      .nullable()
      .index()
      .references('id')
      .inTable('users');
  }

  up(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
