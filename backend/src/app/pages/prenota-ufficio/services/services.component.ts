import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  pageTitle: string
  pageSubtitle: string

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { pageTitle: string; pageSubtitle: string }) => {
      this.pageTitle = data.pageTitle
      this.pageSubtitle = data.pageSubtitle
    })
  }
}
