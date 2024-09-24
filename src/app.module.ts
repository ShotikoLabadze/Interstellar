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
import { FavoritesModule } from './favorites/favorites.module';
import { ListenersModule } from './listeners/listeners.module';
import { FilesModule } from './files/files.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, 
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,//3retertret
    }),
    UserModule,
    MusicModule,
    SearchModule,
    AuthorModule,
    AlbumModule,
    PlaylistModule,
    UserModule,
    AuthModule,
    FavoritesModule,
    ListenersModule,
    FilesModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
