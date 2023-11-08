import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageOfficesService } from '../../../../../services/api/prenota-ufficio/manage-offices.service'
import { Office, OfficePayload } from '../../../../../models/prenota-ufficio/office'

@Component({
  selector: 'app-office-details',
  templateUrl: './office-details.component.html',
  styleUrls: ['./office-details.component.scss'],
})
export class OfficeDetailsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() municipalityId: string
  @Input() office: Office
  @Output() onOfficeCreated: EventEmitter<Office> = new EventEmitter<Office>()
  @Output() onOfficeChange: EventEmitter<Office> = new EventEmitter<Office>()
  @Input() isNew: boolean = true
  validateForm: FormGroup

  latitude: number
  longitude: number

  @ViewChild('gmapAutocomplete') gmapAutocomplete: ElementRef
  autocomplete: google.maps.places.Autocomplete

  @ViewChild('mapContainer', { static: true }) gmap: ElementRef
  map: google.maps.Map

  constructor(
    private officesService: ManageOfficesService,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(changes) {
    if (changes.office) {
      this.initForm()
    }
  }

  ngAfterViewInit() {
    this.initAddressAutocomplete()
    this.initMap()
  }

  initAddressAutocomplete() {
    const options = {
      componentRestrictions: { country: 'it' },
      fields: ['address_components', 'geometry', 'icon', 'name'],
    }

    this.autocomplete = new google.maps.places.Autocomplete(
      this.gmapAutocomplete.nativeElement,
      options,
    )
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()

      if (place.geometry === undefined || place.geometry === null) {
        return
      }

      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      this.validateForm.patchValue({
        address: this.gmapAutocomplete.nativeElement.value,
        latitude: lat,
        longitude: lng,
      })

      this.latitude = lat
      this.longitude = lng
      this.initMap()
    })
  }

  initMap() {
    if (!this.latitude || !this.longitude) {
      return
    }

    const coordinates = new google.maps.LatLng(this.latitude, this.longitude)

    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 15,
      fullscreenControl: true,
      mapTypeControl: true,
      streetViewControl: true,
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions)

    const marker = new google.maps.Marker({
      // icon: {
      //   url: '/assets/images/map_marker.png',
      //   scaledSize: new google.maps.Size(47, 53), // scaled size
      //   origin: new google.maps.Point(0, 0), // origin
      //   anchor: new google.maps.Point(25, 43) // anchor
      // },
      position: coordinates,
      map: this.map,
    })
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: [this.office?.name, [Validators.required]],
      email: [this.office?.email, [Validators.email]],
      description: [this.office?.description, []],
      address: [this.office?.address, []],
      latitude: [this.office?.coordinates.latitude, []],
      longitude: [this.office?.coordinates.longitude, []],
      telephoneNumber: [this.office?.telephoneNumber, []],
      site: [this.office?.site, []],
      imageUrl: [this.office?.imageUrl, []],
    })

    if (this.office) {
      this.latitude = this.office?.coordinates?.latitude
      this.longitude = this.office?.coordinates?.longitude
      this.initMap()
    }
  }

  submitForm(value: { name: string; email: string; description: string }) {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty()
      this.validateForm.controls[key].updateValueAndValidity()
    }

    const payload: OfficePayload = {
      name: this.validateForm.controls['name'].value,
      description: this.validateForm.get('description').value,
      coordinates: {
        longitude: this.validateForm.get('longitude').value,
        latitude: this.validateForm.get('latitude').value,
      },
      address: this.validateForm.get('address').value,
      telephoneNumber: this.validateForm.get('telephoneNumber').value,
      site: this.validateForm.get('site').value,
      email: this.validateForm.get('email').value,
      imageUrl: this.validateForm.get('imageUrl').value,
    }

    if (!this.isNew) {
      this.officesService
        .editOffice(this.municipalityId, this.office.id, payload)
        .subscribe(result => {
          this.office = result
          this.msg.success('Ufficio modificato con successo')
          this.onOfficeChange.emit(result)
        })
    } else {
      this.officesService.createOffice(this.municipalityId, payload).subscribe(result => {
        this.msg.success('Ufficio creato con successo')
        this.onOfficeCreated.emit(result)
      })
    }
  }
}
