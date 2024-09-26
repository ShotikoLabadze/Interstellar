import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AuthorEntity } from 'src/author/entities/author.entity'; // Import AuthorEntity
import { FilesModule } from 'src/files/files.module';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, MusicEntity, AuthorEntity]), // Add AuthorEntity
    FilesModule,
    UserModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [TypeOrmModule, AlbumService],
})
export class AlbumModule {}
