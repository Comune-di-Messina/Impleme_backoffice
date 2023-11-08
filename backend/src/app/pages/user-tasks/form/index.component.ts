import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'user-tasks-form',
  templateUrl: './index.component.html',
})
export class FormComponent implements OnInit {
  @Input() validateForm: FormGroup

  evaluationOptions = [
    { label: 'RIFIUTATA', value: 'RIFIUTATA' },
    { label: 'DA PAGARE', value: 'DA PAGARE' },
    { label: 'DA INTEGRARE', value: 'DA INTEGRARE' },
  ]

  task: any

  constructor() { }

  ngOnInit() {
    // Dati di test
    /*
    this.validateForm.controls['capienza'].setValue(10);
    this.validateForm.controls['categoria'].setValue(1);
    this.validateForm.controls['catering'].setValue(1);
    this.validateForm.controls['comune'].setValue(environment.ENTE_ID);
    this.validateForm.controls['condizioniUtilizzo'].setValue('Condizioni di utilizzo specifihe');
    this.validateForm.controls['giorniAnticipo'].setValue(1);
    this.validateForm.controls['id'].setValue('2ca3a7bb-aaaa-4fba-831d-085ce7f67f4d');
    this.validateForm.controls['nome'].setValue('sala del presidente');
    this.validateForm.controls['tipoStruttura'].setValue(1);
    */
  }

  ngOnDestroy() { }
}
