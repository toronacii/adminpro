import { Component, OnInit } from '@angular/core';

declare var swal: any;

import { User } from '../../models/user.model';
import { UserService, ModalUploadImageService } from '../../services';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  total: number = 0;
  searchTerm$ = new Subject<string>();
  private searchTerm: string = '';

  loading = false;

  constructor(
    private userService: UserService,
    private modalUploadImageService: ModalUploadImageService
  ) {
    this.searchTerm$
      .asObservable()
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(searchTerm => {
          this.searchTerm = searchTerm;
          this.from = 0;
        })
      )
      .subscribe(this.load.bind(this));
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    let observable = this.userService.load(this.from);
    if (this.searchTerm.length) {
      observable = this.userService.search(this.from, this.searchTerm);
    }
    observable.subscribe(data => {
        this.loading = false;
        this.total = data.total;
        this.users = data.results;
      });
  }

  paginate(from: number) {
    let _from = this.from + from;
    if (_from < 0 || _from >= this.total) {
      return;
    }
    this.from = _from;
    this.load();
  }

  delete(user: User) {
    if (user._id === this.userService.user._id) {
      swal('Error', 'Cannot delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: `You will delete to ${ user.name }`,
      icon: 'warning',
      buttons: true,
      dangerMode: false
    })
    .then(willDelete => {
      if (willDelete) {
        this.userService
          .delete(user._id)
          .subscribe(() => {
            this.from = 0;
            this.load();
          });
      }
    });
  }

  update(user: User) {
    this.userService
      .update(user)
      .subscribe();
  }

  openUploadImageModal(user: User) {
    this.modalUploadImageService
      .open({ type: 'user', id: user._id, img: user.avatar })
      .subscribe(this.load.bind(this));
  }

}
