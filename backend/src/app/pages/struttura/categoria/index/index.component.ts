import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { RoomsCategoriesService } from 'src/app/services/api'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'struttura-categoria-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  modelList: any[] = null
  isLoadingModelList: boolean
  subRoute: any = null

  constructor(
    private roomsCategoriesService: RoomsCategoriesService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private aclService: ACLService,
  ) {}

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.loadModelList()
    })
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe()
    }
    this.subRoute = null
  }

  loadModelList() {
    this.isLoadingModelList = true

    this.roomsCategoriesService.index().subscribe(data => {
      this.isLoadingModelList = false
      this.modelList = data
    })
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  onCreateModel() {
    this.router.navigate(['/struttura/categoria/create'])
  }

  deleteModel(m) {
    this.roomsCategoriesService.delete(m.id).subscribe(data => {
      // console.log('api delete', data);
      this.loadModelList()
    })
  }

  onDeleteModel(m) {
    this.modal.confirm({
      nzTitle: 'Sicuro di voler eliminare questa voce?',
      nzOkText: 'Si',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteModel(m)
      },
      nzCancelText: 'No',
    })
  }
}
