import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UbigeoStructure } from 'src/app/commons/ubigeo.structure';
import { Utils } from 'src/utils';
import { Department } from 'src/app/models/department.model';
import { Province } from 'src/app/models/province.model';
import { District } from 'src/app/models/district.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  departments = new Array<Department>();
  provinces = new Array<Province>();
  districts = new Array<District>();

  constructor(
    private api: ApiService,
    private ubigeoStructure: UbigeoStructure
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getDataFile().subscribe(response => {
      this.ubigeoStructure.init(response);
      this.departments = this.ubigeoStructure.getDepartments();
      this.provinces = this.ubigeoStructure.getProvinces();
      this.districts = this.ubigeoStructure.getDistricts();
    });
  }

}
