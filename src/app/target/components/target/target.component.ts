import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../core/services/config.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {MenuItem} from "primeng/api";
import {tap} from "rxjs/operators";

@Component({
  selector: 'hx-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  menuItems$: Observable<MenuItem[]>;

  constructor(
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.menuItems$ = this.configService.getTargetMenu(params.connection, params.target)
        .pipe(tap(value => {
          console.log(value);
        }));
    });

  }

}
