import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ACLService } from 'src/app/services/acl'
import { TributiService } from 'src/app/services/api/tributi/tributi'
import { saveAs } from 'file-saver'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'pagopa-tributi-index',
  templateUrl: './index.component.html',
})
export class TributiIndexComponent implements OnInit {
  tributoList: []
  successMessage: string = null
  errorMessage: string = null

  constructor(
    private tributiService: TributiService,
    private router: Router,
    private aclService: ACLService,
  ) {
    this.tributoList = []
  }
  ngOnInit() {
    this.loadTributoList()
  }

  loadTributoList() {
    this.tributiService.index().subscribe(data => {
      this.tributoList = data
    })
  }

  getAclService() {
    return this.aclService
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  onDeleteTributo(tributo) {
    // console.log('delete tributo', tributo)
    this.tributiService.delete(tributo.IDTributo).subscribe(
      data => {
        this.successMessage = 'Tributo eliminato correttamente'
        // console.log('api delete', data)
        this.loadTributoList()
      },
      error => {
        this.errorMessage = error.error ? error.error?.message : 'Si è verificato un errore'
      },
    )
  }

  onAttributiTributo(tributo) {
    // console.log('onAttributiTributo', tributo)
    this.router.navigate(['/attributi/index', { idTributo: tributo.IDTributo }])
  }

  onTariffeTributo(tributo) {
    // console.log('onTariffeTributo', tributo)
    this.router.navigate(['/tariffe/index', { idTributo: tributo.IDTributo }])
  }

  onCreateTributo() {
    this.router.navigate(['/tributi/create'])
  }

  onDownlaodTributiCSV() {
    this.tributiService.downloadCSV().subscribe(res => {
      const blob = new Blob([res], { type: 'application/octet-stream' })
      const fileName = environment.TRIBUTI_CSV_FILENAME
      saveAs(blob, fileName)
    })
  }
  clearMessages = () => {
    this.successMessage = null
    this.errorMessage = null
  }
}
