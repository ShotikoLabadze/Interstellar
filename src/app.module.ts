import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'miulai',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MusicModule,
    SearchModule,
    AuthorModule,
    AlbumModule,
    PlaylistModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
