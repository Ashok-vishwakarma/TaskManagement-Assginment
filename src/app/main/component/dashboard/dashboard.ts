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
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
  filteredTasks!: Customer[];

  constructor(private cds: CustomerData, private cdr: ChangeDetectorRef, private fb: FormBuilder, private route: Router) { }


  ngOnInit() {

    this.filterCustomer = this.fb.group({
      priority: [''],
      status: ['']
    })

    this.getUserData()
  }

  filterCustomerFilterForm() {
    if (this.filterCustomer.get('priority')?.value == '' && this.filterCustomer.get('status')?.value == '') {
      this.errorMessage = "Atleast One Feild is Required";
      return
    }


    const { priority, status } = this.filterCustomer.value;
    this.filteredTasks = this.customers.filter(task => {
      const matchPriority = priority ? task.priority === priority : true;
      const matchStatus = status ? task.status === status : true;
      return matchPriority && matchStatus;
    });


    this.customers = []
    this.customers = this.filteredTasks
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
        this.loading = false;
      }
    })

  }


  customerTaskManagement(params: string, status: boolean, id: string) {
    debugger
    this.route.navigate(['/addDetails'], {
      queryParams: {
        value: params,
        isDisable: status,
        Id: id
      }
    })
  }


  deletData(id: number) {
    this.cds.deleteTask(id).subscribe({
      next: (res: any) => {
        if (res) {
          this.getUserData()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      }
    })
  }

  conformationDialog(id: any) {

    Swal.fire({
      title: "Are you sure, you want to delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletData(id)
      }
    });
  }



  editTaskManagement(id: string) {
    this.route.navigate(['/edit', id,]);

  }



}
