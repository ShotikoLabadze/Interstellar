import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.cri4ciqww4v1.eu-north-1.rds.amazonaws.com',
      port: 3306, 
      username: 'admin',
      password: 'SadgacShorsromMzea3',
      database: 'miulai2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MusicModule,
    SearchModule,
    AuthorModule,
    AlbumModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
