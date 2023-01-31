import { User } from '@entities/entities/User';
import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './BaseEntity';
import { RoleType } from '@constants/entities/Role';
import { Scalar } from '@constants/interfaces/scalar';

@Entity({ tableName: 'roles' })
export class Role extends CustomBaseEntity<Role, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return ['id', 'name', 'type', 'created_at', 'updated_at', 'deleted_at'];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Unique()
  @Property({ type: 'smallint' })
  type!: RoleType;

  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this);
}
