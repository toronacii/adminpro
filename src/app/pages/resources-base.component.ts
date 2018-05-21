import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ResourceBaseService } from '../services/resource-base.service';
import { ModalUploadImageService } from '../services';

declare var swal: any;

export abstract class ResourcesBaseComponent<T> {
    items: T[] = [];
    from: number = 0;
    total: number = 0;
    searchTerm$ = new Subject<string>();

    searchTerm: string = '';

    loading = false;

    constructor(
        public service: ResourceBaseService<T>,
        public modalUploadImageService: ModalUploadImageService
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

      load() {
        this.loading = true;
        let observable = this.service.load(this.from);
        if (this.searchTerm.length) {
          observable = this.service.search(this.from, this.searchTerm);
        }
        observable.subscribe(data => {
            this.loading = false;
            this.total = data.total;
            this.items = data.results;
          });
      }

      delete(item: T, message: string) {
        swal({
          title: 'Are you sure?',
          text: message,
          icon: 'warning',
          buttons: true,
          dangerMode: false
        })
        .then(willDelete => {
          if (willDelete) {
            this.service
              .delete(item['_id'])
              .subscribe(() => {
                this.from = 0;
                this.load();
              });
          }
        });
      }

      add(item: T) {
        return this.service
            .create(item)
            .subscribe(this.load.bind(this));
      }

      update(item: T) {
        this.service
          .update(item)
          .subscribe();
      }

      openUploadImageModal(options: Object) {
        this.modalUploadImageService
          .open(options)
          .subscribe(this.load.bind(this));
      }

      paginate(from: number) {
        let _from = this.from + from;
        if (_from < 0 || _from >= this.total) {
          return;
        }
        this.from = _from;
        this.load();
      }
}
