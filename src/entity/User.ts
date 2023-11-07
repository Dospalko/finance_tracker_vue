import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string; // In a real app, this should be hashed!

  // Add this property to establish the inverse side of the relationship
  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[];
}
