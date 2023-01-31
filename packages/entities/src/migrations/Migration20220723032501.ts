import { MigrationWithTimestamps } from '@entities/config/migration-with-timestamps';

export class Migration20220723032501 extends MigrationWithTimestamps {
  override async up(): Promise<void> {
    const knex = this.getKnexBuilder();
    await knex.schema.createTable('roles', (tableBuilder) => {
      this.addUuidPrimaryColumn(tableBuilder);
      tableBuilder.string('name', 255).unique().notNullable();
      tableBuilder.smallint('type').unique().notNullable();
      this.addTimestampColumns(tableBuilder);
      this.addSoftDeleteColumns(tableBuilder);
    });
  }

  override async down(): Promise<void> {
    const knex = this.getKnexBuilder();
    const schema = knex.schema;
    await schema.dropTable('roles');
  }
}
