import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  name: string;
}
