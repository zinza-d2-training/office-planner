import { Role } from '@entities/entities/Role';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { Maybe, Scalar } from '@constants/interfaces/scalar';

export enum SitePreferenceTheme {
  dark = 'dark',
  light = 'light',
}

export interface SitePreferencesInterface {
  theme: SitePreferenceTheme;
}

@Entity({ tableName: 'users' })
export class User extends CustomBaseEntity<User, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'email',
      'google_id',
      'avatar',
      'role_id',
      'birthday',
      'position',
      'job_title',
      'site_preferences',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Unique()
  @Property({ type: 'varchar', length: 255 })
  email!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255, nullable: true })
  google_id!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  avatar!: Maybe<'varchar'>;

  @Property({ type: 'uuid' })
  role_id!: Scalar['uuid'];

  @Property({ type: 'date', nullable: true })
  birthday!: Maybe<'date'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  position!: Maybe<'varchar'>;

  @Property({ type: 'varchar', nullable: true })
  job_title!: Maybe<'varchar'>;

  @Property({ type: 'jsonb' })
  site_preferences!: SitePreferencesInterface;

  @ManyToOne({
    entity: () => Role,
    nullable: true,
  })
  role!: Role;
}
