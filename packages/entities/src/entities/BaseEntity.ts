import { PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';
import { Scalar } from '@constants/interfaces/scalar';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@SoftDeletable(() => CustomBaseEntity, 'deleted_at', () => new Date())
export abstract class CustomBaseEntity<
  Entity extends object,
  Primary extends keyof Entity,
  Populate extends string = string
> extends BaseEntity<Entity, Primary, Populate> {
  @PrimaryKey({ type: 'uuid', default: null })
  id!: string;

  @Property()
  created_at: Scalar['timestamp'] = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at: Scalar['timestamp'] = new Date();

  @Property({ nullable: true })
  deleted_at?: Scalar['timestamp'];
}
