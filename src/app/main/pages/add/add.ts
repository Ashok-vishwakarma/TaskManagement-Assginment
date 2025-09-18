import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerData } from '../../../services/customer-data';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
  standalone: true,
})
export class Add {

  taskForm!: FormGroup
  pageTitle!: string
  userId: any;
  isDisableFeild: any

  constructor(private fb: FormBuilder, private cds: CustomerData, private activateRoute: ActivatedRoute, private router: Router) {
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.pageTitle = res.value == "View" ? "View" : res.value == "Edit" ? "Edit" : res.value == "Add" ? "Add" : "";
      this.userId = res.Id;
      this.isDisableFeild = res.isDisable;
    })

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      taskImage: [null],
      date: ['', Validators.required]
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.taskForm.patchValue({ taskImage: file });
    }
  }

  onSubmit() {
    debugger
    if (this.taskForm.valid) {
      console.log('Task Form Data:', this.taskForm.value);
      // alert('Task Submitted Successfully!');
      this.cds.addTask(this.taskForm.value).subscribe((res: any) => {
        console.log(res)
        if (res) {
          this.taskForm.reset();
          Swal.fire({
            icon: "success",
            title: "Task ",
            text: "Sucessfully Submitted"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      }, (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error
        });
      })

    }
  }


  backtoDashboard() {

    if (this.hasFormValues()) {
      Swal.fire({
        title: "Are you sure, you want to go Back",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['dashboard']);
          this.taskForm.reset();
        }
      });
    } else {
      this.router.navigate(['dashboard']);
    }

  }

  hasFormValues(): boolean {
    return Object.keys(this.taskForm.controls).some(key => {
      const value = this.taskForm.get(key)?.value;
      return value !== null && value !== '';
    });
  }





  updateUserTask() {

    if (!this.taskForm.valid) {
      return
    }

    this.cds.updateTask(this.userId, this.taskForm.value).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/dashboard'])
        Swal.fire(`Record updated against the ID-${this.userId}`);
      }
    })

  }

}
