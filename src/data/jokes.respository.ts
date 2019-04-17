import { Injectable} from '@nestjs/common';
import { AxiosInstance, default as Axios } from 'axios';

@Injectable()
export class JokesRepository {
    private client: AxiosInstance;

    constructor() {
      this.client = Axios.create({
        baseURL: 'https://api.chucknorris.io/jokes/'
      });
    }

    async findJokesRandom(){
        return this.client.get(`random`)
    }
}