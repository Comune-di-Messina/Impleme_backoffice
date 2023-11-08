import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Institute } from '../../../../models/institute'
import { TipologiaPratica } from '../../../../models/passi-carrabili/pratiche'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'
import { TipologieResponse } from './types-resolver.service'
import { environment } from '../../../../../environments/environment'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  institutes: Institute[]
  tipologie: TipologiaPratica[]
  isLoadingModelList: boolean = false
  errorMessage: string
  successMessage: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private managePraticheService: ManagePraticheService,
    private entiService: EntiService,
    private aclService: ACLService,
    private modal: NzModalService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { tipologieResponse: TipologieResponse }) => {
      this.tipologie = data.tipologieResponse.tipologie
      this.institutes = data.tipologieResponse.institutes

      console.log(
        {
          institutes: this.institutes,
          tipologie: this.tipologie,
        },
        'Get data',
      )
    })
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  async getTypes() {
    const types = await this.managePraticheService.getTypes().toPromise()
    this.tipologie = types
  }

  onAlertClose() {
    this.successMessage = null
  }

  onCreateModel() {
    this.router.navigate(['/passi-carrabili/types/create'])
  }

  deleteModel(m: TipologiaPratica) {
    this.errorMessage = null
    this.managePraticheService.deleteType(m.id).subscribe(
      data => {
        this.msg.success('Tipologia eliminata con successo')
        this.getTypes()
      },
      error => {
        this.errorMessage = 'Impossibile eliminare la tipologia selezionata.'
      },
    )
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
