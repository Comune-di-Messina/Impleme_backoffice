import { Component, OnInit } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
  NzTableQueryParams,
} from 'ng-zorro-antd/table'
import { select, Store } from '@ngrx/store'
import { ManageSectorsService } from '../../../../services/api/segnalame/management/manage-sectors.service'
import { ManageInstitutesService } from '../../../../services/api/segnalame/management/manage-institutes.service'
import {
  ManageReportingsService,
  QueryParams,
} from '../../../../services/api/segnalame/management/manage-reportings.service'
import { Reporting, ReportingStatus } from '../../../../models/segnalame/reporting'
import { Sector } from '../../../../models/segnalame/sector'
import { Institute } from '../../../../models/segnalame/institute'
import * as Formatter from 'src/app/utils/formatters'
import * as Reducers from '../../../../store/reducers'

interface FilterValue {
  text: string
  value: string
}

interface HeaderItem {
  name: string
  keySort?: (x: any) => string
  keyFilter?: (x: any) => FilterValue
  sortDefault?: string
}

interface ColumnItem {
  name: string
  sortOrder?: NzTableSortOrder | null
  sortFn?: NzTableSortFn | null
  listOfFilter?: NzTableFilterList | null
  filterFn?: NzTableFilterFn | null
  filterMultiple?: boolean
  sortDirections?: NzTableSortOrder[]
}

@Component({
  selector: 'app-reportings-list',
  templateUrl: './reportings-list.component.html',
  styleUrls: ['./reportings-list.component.scss'],
})
export class ReportingsListComponent implements OnInit {
  currentUser: any
  loadingResults = false
  totalResults = 0
  pageSize = 10
  pageIndex = 1

  reportings: Reporting[] = []
  statuses: ReportingStatus[] = []
  sectors: Sector[] = []
  institutes: Institute[] = []
  itemsInPage: Reporting[] = []
  listOfColumns: ColumnItem[] = []

  searchForm = {
    id: null,
    dateRange: null,
    text: null,
    institute: null,
    sector: null,
    status: null,
  }

  formSortField: string = 'insertTs'
  formSortDirection: string = 'desc'

  searchFiltersVisible = {
    id: false,
    dateRange: false,
    text: false,
    institute: false,
    sector: false,
    status: false,
  }

  constructor(
    private manageReportingsService: ManageReportingsService,
    private manageSectorsService: ManageSectorsService,
    private manageInstitutesService: ManageInstitutesService,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    // this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.currentUser = state
    })

    this.initData()
  }

  async initData() {
    this.statuses = await this.getStatuses()
    // this.reportings = await this.getReportings()
    this.sectors = await this.getSectors()
    this.institutes = await this.getInstitutes()
    // this.listOfColumns = this.generateColumns()
    /// this.searchReportings();
  }

  async getStatuses() {
    return this.manageReportingsService.getAllActiveStatuses().toPromise()
  }

  async getReportings() {
    return this.manageReportingsService.getList().toPromise()
  }

  async getSectors() {
    return this.manageSectorsService.getSectors(0).toPromise()
  }

  async getInstitutes() {
    return this.manageInstitutesService.getList().toPromise()
  }

  searchReportings(resetPage: boolean = false) {
    this.loadingResults = true
    this.hideTableFilters()

    if (resetPage) {
      this.pageIndex = 1
    }

    const paramsNew: QueryParams = {
      page: String(this.pageIndex - 1),
      size: String(this.pageSize),
    }

    if (this.searchForm.dateRange && this.searchForm.dateRange.length === 2) {
      const dateStart = this.searchForm.dateRange[0] as Date
      const dateEnd = this.searchForm.dateRange[1] as Date

      dateStart.setHours(0, 0, 0, 0)
      dateEnd.setHours(23, 59, 59, 0)

      paramsNew['insertTs.greaterThanOrEqual'] = dateStart.toISOString()
      paramsNew['insertTs.lessThanOrEqual'] = dateEnd.toISOString()
    }

    if (this.searchForm.id) {
      paramsNew['id.equals'] = String(this.searchForm.id)
    }

    if (this.searchForm.institute) {
      paramsNew['instituteId.equals'] = String(this.searchForm.institute)
    }

    if (this.searchForm.sector) {
      paramsNew['sectorId.equals'] = String(this.searchForm.sector)
    }

    if (this.searchForm.status) {
      paramsNew['statusId.equals'] = String(this.searchForm.status)
    }

    if (this.searchForm.text) {
      paramsNew['title.contains'] = String(this.searchForm.text)
    }

    if (this.formSortField) {
      paramsNew['sort'] =
        this.formSortField + ',' + (this.formSortDirection === 'desc' ? 'desc' : 'asc')
    }

    this.manageReportingsService.searchReportings(paramsNew).subscribe(
      result => {
        this.loadingResults = false
        this.totalResults = Number(result.headers.get('x-total-count')) ?? 0
        this.reportings = result.body ?? []
      },
      error => {
        console.log(error)
        this.loadingResults = false
        this.totalResults = 0
        this.reportings = []
      },
    )
  }

  getActiveStatus(statusId: number): ReportingStatus {
    return this.statuses.find((status, i) => {
      return status.id === statusId
    })
  }

  getStatusColor(statusId: number) {
    switch (statusId) {
      case 1:
        // Inserita
        return 'blue'
      case 2:
        // Accepted
        return 'cyan'
      case 3:
        // Rifiutata
        return 'red'
      case 4:
        // In lavorazione
        return 'gold'
      case 5:
        // Risolta
        return 'green'
      case 6:
        // Non risolvibile
        return 'volcano'
      case 7:
        // Risolta parzialmente
        return 'lime'

      default:
        return 'blue'
    }
  }

  getSingleInstitute(instituteId: number): Institute {
    return this.institutes.find((institute, i) => {
      return institute.id === instituteId
    })
  }

  getSingleSector(sectorId: number): Sector {
    return this.sectors.find((sector, i) => {
      return sector.id === sectorId
    })
  }

  getDateTime(date: string) {
    return Formatter.asDate(date)
  }

  onCurrentPageDataChange(itemsInPage) {
    this.itemsInPage = itemsInPage
  }

  onChangePage(page: number) {
    // console.log(page, 'onChangePage')
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params
    const currentSort = sort.find(item => item.value !== null)
    const sortField = (currentSort && currentSort.key) || null
    const sortOrder = (currentSort && currentSort.value) || null

    this.pageIndex = pageIndex
    this.pageSize = pageSize

    this.formSortField = sortField ?? null
    this.formSortDirection = sortOrder === 'descend' ? 'desc' : 'asc'

    this.searchReportings()
  }

  resetForm(value?: string) {
    if (value) {
      this.searchForm[value] = null
    } else {
      this.searchForm = {
        id: null,
        dateRange: null,
        text: null,
        institute: null,
        sector: null,
        status: null,
      }
    }

    this.hideTableFilters()

    this.searchReportings(true)
  }

  hideTableFilters() {
    this.searchFiltersVisible = {
      id: false,
      dateRange: false,
      text: false,
      institute: false,
      sector: false,
      status: false,
    }
  }

  onDateChange(result: Date[]): void {
    // console.log('onChange: ', result)
  }
}
