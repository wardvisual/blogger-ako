import slugify from 'slugify';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@/models/user/entities/user.entity';
import { CategoryEntity } from '@/models/category/entities/category.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  userId: number;

  @Column({ default: 1 })
  categoryId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.posts,
    { eager: true }
  )
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  category?: CategoryEntity;

  @BeforeInsert()
  slugifyPost() {
    this.slug = slugify(this.title.substring(0, 20), {
      lower: true,
      replacement: '_',
    });
  }
}
