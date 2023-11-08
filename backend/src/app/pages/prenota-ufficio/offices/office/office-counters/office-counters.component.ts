import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageOfficesService } from '../../../../../services/api/prenota-ufficio/manage-offices.service'
import { ManagePublicServicesService } from '../../../../../services/api/prenota-ufficio/manage-public-services.service'
import { Office } from '../../../../../models/prenota-ufficio/office'
import { Counter, CounterPayload } from '../../../../../models/prenota-ufficio/counter'
import { PublicService } from '../../../../../models/prenota-ufficio/public-service'

@Component({
  selector: 'app-office-counters',
  templateUrl: './office-counters.component.html',
  styleUrls: ['./office-counters.component.scss'],
})
export class OfficeCountersComponent implements OnInit, OnChanges {
  @Input() municipalityId: string
  @Input() office: Office
  services: PublicService[] = []
  counters: Counter[] = []
  listData: Array<Counter & { publicServiceIds: string[]; edit: boolean }> = []

  constructor(
    private officesService: ManageOfficesService,
    private publicServicesService: ManagePublicServicesService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.getServices()
  }

  ngOnChanges(changes) {
    if (changes.office) {
      this.getCounters()
    }
  }

  getServices() {
    this.publicServicesService.getPublicServices().subscribe(results => {
      this.services = results
    })
  }

  getCounters() {
    if (this.office) {
      this.officesService
        .getOfficeCounters(this.municipalityId, this.office.id)
        .subscribe(result => {
          this.counters = result
          this.initTable()
        })
    }
  }

  initTable() {
    this.listData = this.counters.map(counter => {
      return {
        ...counter,
        publicServiceIds: counter.publicService.reduce((acc, item) => {
          return [...acc, item.id]
        }, []),
        edit: false,
      }
    })
  }

  onPublicServicesChange(event: any) {
    console.log(event, 'change')
  }

  startEdit(counter: Counter & { publicServiceIds: string[]; edit: boolean }): void {
    counter.edit = true
  }

  stopEdit(counter: any): void {
    // console.log(subsector, 'stopEdit');
  }

  addRow(): void {
    this.listData = [
      ...this.listData,
      {
        id: null,
        number: null,
        officeId: this.office.id,
        publicService: [],
        publicServiceIds: [],
        edit: true,
      },
    ]
  }

  // Create Counter
  async createCounter(item: Counter & { publicServiceIds: string[]; edit: boolean }) {
    if (!item.number) return

    const payload: CounterPayload = {
      number: item.number,
      publicServiceId: item.publicServiceIds,
    }

    const counter = await this.officesService
      .createOfficeCounter(this.municipalityId, this.office.id, payload)
      .toPromise()

    this.msg.success('Sportello creata con successo')
    return counter
  }

  async editCounter(item: Counter & { publicServiceIds: string[]; edit: boolean }) {
    if (!item.number) return

    const payload: CounterPayload = {
      number: item.number,
      publicServiceId: item.publicServiceIds,
    }

    const counter = await this.officesService
      .editOfficeCounter(this.municipalityId, this.office.id, item.id, payload)
      .toPromise()

    this.msg.success('Sportello modificato con successo')
    return counter
  }

  async saveRow(counter: Counter & { publicServiceIds: string[]; edit: boolean }, index: number) {
    let response: Counter = null
    if (counter.id) {
      response = await this.editCounter(counter)
    } else {
      response = await this.createCounter(counter)
    }

    this.listData[index] = {
      ...response,
      publicServiceIds: response.publicService.reduce((acc, item) => {
        return [...acc, item.id]
      }, []),
      edit: false,
    }
    this.listData = [...this.listData]
  }

  async deleteRow(counter: Counter & { publicServiceIds: string[]; edit: boolean }, index: number) {
    if (counter.id) {
      await this.officesService
        .deleteOfficeCounter(this.municipalityId, this.office.id, counter.id)
        .toPromise()
    }

    this.listData.splice(index, 1)
    this.listData = [...this.listData]
    return
  }

  validateCounter(counter: Counter) {
    if (counter.number) {
      return true
    }

    return false
  }
}
