import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TariffeService } from 'src/app/services/api/tributi/tariffe'
import { NzModalService } from 'ng-zorro-antd/modal'
import { AttributiService } from 'src/app/services/api/tributi/attributi'

@Component({
  selector: 'pagopa-attributi-index',
  templateUrl: './index.component.html',
})
export class AttributiIndexComponent implements OnInit {
  attributoList: []
  idTributo: null

  constructor(
    private attributiService: AttributiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) {
    this.attributoList = []
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      // console.log('routeParams', routeParams);
      this.idTributo = routeParams.idTributo
      this.loadAttributoList()
    })
  }

  loadAttributoList() {
    this.attributiService.index(this.idTributo).subscribe(data => {
      this.attributoList = data
    })
  }

  onDeleteAttributo(attributo) {
    this.modalService.confirm({
      nzTitle: 'Sei sicuro di cancellare questo elemento?',
      nzCancelText: 'Annulla',
      nzOnOk: () => {
        this.attributiService.delete(this.idTributo, attributo.id).subscribe(data => {
          // console.log('api delete', data);
          this.loadAttributoList()
        })
      },
    })
  }

  onAttributiTributo(tributo) {
    // console.log('tariffe', this.idTributo);
    this.router.navigate(['/attributi/index', { idTributo: this.idTributo }])
  }

  onCreateAttributo() {
    this.router.navigate(['/attributi/create', { idTributo: this.idTributo }])
  }
}
