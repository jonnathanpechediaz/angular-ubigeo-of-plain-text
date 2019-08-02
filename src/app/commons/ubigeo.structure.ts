import { Injectable } from '@angular/core';
import { Utils } from 'src/utils';
import { Department } from '../models/department.model';
import { Province } from '../models/province.model';
import { District } from '../models/district.model';

@Injectable({
  providedIn: 'root'
})
export class UbigeoStructure {

  departments = new Array<Department>();
  provinces = new Array<Province>();
  districts = new Array<District>();

  init(text: string) {
    let data = text.split('\n');
    console.log(data);
    if (data.length > 0) {
      data = data.filter((item) => {
        return item !== '';
      });
      data = data.map((item) => {
        return Utils.replaceAll(item, '"', '');
      });
      console.log(data);
    }

    //
    let department = new Department();
    let province = new Province();
    let district = new District();
    data.forEach((item) => {
      const row = item.split('/');
      row.forEach((value, index) => {
        value = Utils.trim(value);
        switch (index) {
          case 0: {
            // Valid Department
            if (value !== '') {
              const valueObj = this.getItemStruct(value);
              department = new Department();
              department.id = valueObj.id;
              department.name = valueObj.value;
              this.checkDepartment(department);
            }
            break;
          }
          case 1: {
            // Valid Province
            if (value !== '') {
              const valueObj = this.getItemStruct(value);
              province = new Province();
              province.id = valueObj.id;
              province.name = valueObj.value;
              province.department = department;
              this.checkProvince(province);
            }
            break;
          }
          case 2: {
            // Valid District
            if (value !== '') {
              const valueObj = this.getItemStruct(value);
              district = new District();
              district.id = valueObj.id;
              district.name = valueObj.value;
              district.province = province;
              this.checkDistrict(district);
            }
            break;
          }
        }
      });
    });
  }

  getItemStruct(item: string) {
    const valueArr = item.split(' ');
    return {
      id: valueArr[0],
      value: valueArr.filter((val, i) => i > 0).join(' '),
    };
  }

  checkDepartment(department: Department) {
    let exist = false;
    for (const item of this.departments) {
      if (item.id === department.id) {
        exist = true;
        break;
      }
    }

    if (!exist) {
      this.departments.push(department);
    }
  }

  checkProvince(province: Province) {
    let exist = false;
    for (const item of this.provinces) {
      if (item.id === province.id) {
        exist = true;
        break;
      }
    }

    if (!exist) {
      this.provinces.push(province);
    }
  }

  checkDistrict(district: District) {
    let exist = false;
    for (const item of this.districts) {
      if (item.id === district.id) {
        exist = true;
        break;
      }
    }

    if (!exist) {
      this.districts.push(district);
    }
  }

  getDepartments() {
    return this.departments;
  }

  getProvinces() {
    return this.provinces;
  }

  getDistricts() {
    return this.districts;
  }
}
