import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  private readonly songs: CreateSongDto[] = [];

  create(song: CreateSongDto) {
    //SAVE THE SONG IN DB
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // FETCH SONG FROM DB
    throw new Error('Error inDB while fetching');
    return this.songs;
  }
}
