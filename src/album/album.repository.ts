import { Injectable } from "@nestjs/common";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()

export class AlbumRepository{
    private albums = [];
    
    create(createAlbumDto: CreateAlbumDto){
        const newAlbum = { id: this.albums.length + 1, ...createAlbumDto};
        this.albums.push(newAlbum);
        return newAlbum;
    }

    findAll(){
        return this.albums
    }
    
    findOne(id: number){
        for(let i = 0; i < this.albums.length; i++){
            if(this.albums[i].id === Number(id)){
                return this.albums[i];
            }
        }
        return "error"
    }

    update(id: number, updateAlbumsDto: UpdateAlbumDto){
        for (let i = 0; i < this.albums.length; i++){
            if (this.albums[i].id === Number(id)){
                const updatedAlbums = { ...this.albums[i], ...updateAlbumsDto };
                this.albums[i] = updatedAlbums;
                return updatedAlbums;
            }
        }
        return "error"
    }

    remove(id: number){
        for (let i = 0; i < this.albums.length; i++){
            if (this.albums[i].id === Number(id)){
                const [removedAlbums] = this.albums.splice(i, 1);
                return removedAlbums;
            }
        }
        return "error"
    }
}