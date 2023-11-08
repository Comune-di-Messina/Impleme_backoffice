import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { formatDate } from '@angular/common'
import * as DateFns from 'date-fns'
import * as Formatter from 'src/app/utils/formatters'
import { Institute } from '../../../../models/institute'
import {
  Pratica,
  TipologiaPratica,
  TaskDomain,
  getStatusName,
  getStatusColor,
} from '../../../../models/passi-carrabili/pratiche'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'
import { ReservationIdPipe } from '../../../../pipes/reservation-id.pipe'
import { PraticheResponse } from './case-files-resolver.service'

@Component({
  selector: 'app-case-files',
  templateUrl: './case-files.component.html',
  styleUrls: ['./case-files.component.scss'],
  providers: [ReservationIdPipe],
})
export class CaseFilesComponent implements OnInit {
  institutes: Institute[]
  tipologie: TipologiaPratica[]
  pratiche: Pratica[] = []
  praticheDemandable: TaskDomain[] = []
  itemsInPage: Pratica[] = []
  pageSize = 10
  pageIndex = 1

  searchForm = {
    idCaseFile: null,
    richiedente: null,
    ente: null,
    state: null,
  }

  searchFiltersVisible = {
    idCaseFile: false,
    richiedente: false,
    ente: false,
    state: false,
  }

  constructor(
    private route: ActivatedRoute,
    private managePraticheService: ManagePraticheService,
    private entiService: EntiService,
    private reservationIdPipe: ReservationIdPipe,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { praticheResponse: PraticheResponse }) => {
      this.pratiche = data.praticheResponse.pratiche
      this.tipologie = data.praticheResponse.tipologie
      this.institutes = data.praticheResponse.institutes
      this.praticheDemandable = data.praticheResponse.praticheDemandable

      this.search()
      console.log(
        {
          institutes: this.institutes,
          tipologie: this.tipologie,
          pratiche: this.pratiche,
          praticheDemandable: this.praticheDemandable,
        },
        'Get data',
      )
    })
  }

  async getCaseFiles() {
    return this.managePraticheService.getCaseFiles().toPromise()
  }

  get stateFilters() {
    return Array.from(
      this.pratiche
        .map(x => {
          return { text: getStatusName(x.state), value: x.state }
        })
        .reduce((m, t) => m.set(t.value, t), new Map())
        .values(),
    )
  }

  getActiveStatus(pratica: Pratica): string {
    return getStatusName(pratica.state)
  }

  getActiveStatusColor(pratica: Pratica): string {
    return getStatusColor(pratica.state)
  }

  getInstituteByCode(code: string): Institute {
    if (!this.institutes?.length) return null

    return this.institutes.find((item, i) => {
      return item.codice === code
    })
  }

  sortById(a: Pratica, b: Pratica) {
    const firstEl = ReservationIdPipe.prototype.transform(a.idCaseFile)
    const secondEl = ReservationIdPipe.prototype.transform(b.idCaseFile)
    return firstEl.localeCompare(secondEl)
  }

  sortByRichiedente(a: Pratica, b: Pratica) {
    const firstEl = a.richiedente.name + a.richiedente.surname
    const secondEl = b.richiedente.name + b.richiedente.surname
    return firstEl.localeCompare(secondEl)
  }

  resetSearch(value?: string): void {
    if (value) {
      this.searchForm[value] = null
    } else {
      this.searchForm = {
        idCaseFile: null,
        richiedente: null,
        ente: null,
        state: null,
      }
    }

    this.search()
  }

  onCurrentPageDataChange(itemsInPage) {
    // this.itemsInPage = itemsInPage
  }

  onCurrentPageChange(e: number) {
    this.pageIndex = e
  }

  search(): void {
    this.itemsInPage = this.pratiche

    this.searchFiltersVisible = {
      idCaseFile: false,
      richiedente: false,
      ente: false,
      state: false,
    }

    if (this.searchForm.idCaseFile) {
      this.itemsInPage = this.itemsInPage.filter((pratica: Pratica) => {
        const idFormatted = this.reservationIdPipe.transform(pratica.idCaseFile)
        return idFormatted.indexOf(this.searchForm.idCaseFile) !== -1
      })
    }

    if (this.searchForm.richiedente) {
      this.itemsInPage = this.itemsInPage.filter((pratica: Pratica) => {
        return (
          pratica.richiedente.name
            .toLowerCase()
            .indexOf(this.searchForm.richiedente.toLowerCase()) !== -1 ||
          pratica.richiedente.surname
            .toLowerCase()
            .indexOf(this.searchForm.richiedente.toLowerCase()) !== -1
        )
      })
    }

    if (this.searchForm.ente) {
      this.itemsInPage = this.itemsInPage.filter((pratica: Pratica) => {
        return pratica.ente === this.searchForm.ente
      })
    }

    if (this.searchForm.state) {
      this.itemsInPage = this.itemsInPage.filter((pratica: Pratica) => {
        return pratica.state === this.searchForm.state
      })
    }
  }
}
