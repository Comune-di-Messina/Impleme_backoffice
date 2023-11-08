import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TariffeService } from 'src/app/services/api/tributi/tariffe'
import { NzModalService } from 'ng-zorro-antd/modal'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'pagopa-tariffe-index',
  templateUrl: './index.component.html',
})
export class TariffeIndexComponent implements OnInit {
  tariffaList: []
  idTributo: null

  constructor(
    private tariffeService: TariffeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NzModalService,
    private aclService: ACLService,
  ) {
    this.tariffaList = []
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      // console.log('routeParams', routeParams);
      this.idTributo = routeParams.idTributo
      this.loadTariffaList()
    })
  }

  loadTariffaList() {
    this.tariffeService.index(this.idTributo).subscribe(data => {
      this.tariffaList = data
    })
  }

  getAclService() {
    return this.aclService
  }

  onDeleteTariffa(tariffa) {
    // console.log('delete tariffa', tariffa);

    this.modalService.confirm({
      nzTitle: 'Sei sicuro di cancellare questo elemento?',
      nzCancelText: 'Annulla',
      nzOnOk: () => {
        this.tariffeService.delete(this.idTributo, tariffa.id).subscribe(data => {
          // console.log('api delete', data);
          this.loadTariffaList()
        })
      },
    })
  }

  onTariffeTributo(tributo) {
    // console.log('tariffe', this.idTributo);
    this.router.navigate(['/tariffe', { idTributo: this.idTributo }])
  }

  onCreateTariffa() {
    this.router.navigate(['/tariffe/create', { idTributo: this.idTributo }])
  }
}
