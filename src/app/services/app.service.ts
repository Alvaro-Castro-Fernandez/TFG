import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loading = false;

  constructor() {
  }

  isLoading() {
    return this.loading;
  }

  load() {
    this.loading = true;
  }

  loaded() {
    this.loading = false;
  }
}
