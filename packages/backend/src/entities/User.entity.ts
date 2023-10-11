import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  group: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  idCard: number;

  @Column({ nullable: false })
  faculty: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
