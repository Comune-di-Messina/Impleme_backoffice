import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageInstitutesService } from '../../../../../services/api/segnalame/management/manage-institutes.service'
import { Institute } from '../../../../../models/segnalame/institute'

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss'],
})
export class InstituteComponent implements OnInit {
  isNew: boolean = false
  edit: boolean = false
  pageTitle: string
  pageSubtitle: string
  instituteId: any
  institute: Institute = {} as Institute
  institutes: Institute[] = []
  availableNames: any[] = []

  validateForm: FormGroup
  errorSave

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageInstitutesService: ManageInstitutesService,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.edit = data.edit
      this.isNew = data.isNew
      this.pageTitle = data.pageTitle
      this.pageSubtitle = data.pageSubtitle

      if (data.isNew) {
        this.institute.enabled = true
      }
    })

    this.route.params.subscribe(params => {
      if (params.instituteId) {
        this.instituteId = params.instituteId
        this.manageInstitutesService.getInstitute(this.instituteId).subscribe(result => {
          this.institute = result
          this.initForm()
        })
      }
    })

    this.getInstitutes()
    this.getAvailableNames()
    this.initForm()
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: [this.institute?.name, [Validators.required, this.forbiddenNameValidator()]],
      email: [this.institute?.email, []],
      // type: [this.institute?.type, []],
      enabled: [this.institute?.enabled, []],
    })
  }

  getInstitutes() {
    this.manageInstitutesService.getList().subscribe(result => {
      this.institutes = result
    })
  }

  getAvailableNames() {
    this.manageInstitutesService.getAvailableInstituteNames().subscribe(result => {
      this.availableNames = result.cities.map(name => {
        return {
          id: name,
          value: name,
        }
      })
    })
  }

  get enabledNames(): any[] {
    return this.availableNames.reduce((acc, name) => {
      if (
        this.institutes.find(institute => institute.name.toLowerCase() === name.value.toLowerCase())
      ) {
        // TODO Testare quando saranno disponibili comuni da creare
        // return acc;
      }

      return [...acc, name]
    }, [])
  }

  async submitForm() {
    this.errorSave = null

    if (!this.edit) {
      return
    }

    /* for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    } */

    for (var i in this.validateForm.controls) {
      // console.log(i, this.validateForm.controls[i].value, 'this.validateForm.controls[i].value')
      this.institute[i] = this.validateForm.controls[i].value
    }

    if (this.isNew) {
      this.institute = await this.manageInstitutesService
        .createInstitute(this.institute)
        .toPromise()
        .catch(error => {
          this.msg.error("Errore durante l'invio dei dati")
          throw new Error("Errore durante l'invio dei dati")
        })
    } else {
      this.institute = await this.manageInstitutesService
        .editInstitute(this.institute)
        .toPromise()
        .catch(error => {
          this.msg.error("Errore durante l'invio dei dati")
          throw new Error("Errore durante l'invio dei dati")
        })
    }

    this.msg.success('Operazione completata con successo')
    if (this.isNew) {
      this.router.navigate(['/segnalame/settings/institutes/edit/' + this.institute.id])
    }
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // const forbidden = nameRe.test(control.value);
      const forbidden = this.institutes.find(institute => {
        return institute.name.toLowerCase() === control.value.toLowerCase()
      })
      console.log(this.institutes, forbidden, control.value)
      return forbidden ? { forbiddenName: { value: control.value } } : null
    }
  }
}
