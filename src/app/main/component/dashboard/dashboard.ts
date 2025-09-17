import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Customer } from '../../../model/customerInterface';
import { CustomerData } from '../../../services/customer-data';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, IconFieldModule, ReactiveFormsModule, InputIconModule, ButtonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit {

  loading: boolean = false;
  customers!: Customer[];

  filterCustomer!: FormGroup;
  errorMessage: any = ''

  constructor(private cds: CustomerData, private cdr: ChangeDetectorRef, private fb: FormBuilder, private route: Router) { }


  ngOnInit() {

    this.filterCustomer = this.fb.group({
      priority: [''],
      status: ['']
    })

    this.getUserData()
  }


  submitCustomerFilterForm() {
    if (this.filterCustomer.get('priority')?.value == '' && this.filterCustomer.get('status')?.value == '') {
      this.errorMessage = "Atleast One Feild is Required"
      return
    }

    alert("working")
  }



  getUserData() {
    debugger
    this.loading = true
    this.cds.getTask().subscribe({
      next: (res: any) => {
        this.loading = false
        this.customers = res
        console.log(res)
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }


  CustomerData(params: string) {
    this.route.navigate(['/addDetails'], {
      queryParams: {
        value: params
      }
    })
  }

  editData() {

  }

  deletData() {

  }

}
