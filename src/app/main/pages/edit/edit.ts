import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerData } from '../../../services/customer-data';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit {


  editTask!: FormGroup
  userId: any;

  constructor(private fb: FormBuilder, private cds: CustomerData, private activateRoute: ActivatedRoute, private router: Router) {

    this.userId = this.activateRoute.snapshot.paramMap.get('id')

    this.editTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      taskImage: [null],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currentRecord()
  }


  updateUserTask() {

    if (!this.editTask.valid) {
      this.editTask.markAllAsTouched();
      return
    }

    this.cds.updateTask(this.userId, this.editTask.value).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/dashboard'])
        Swal.fire(`Record updated against the ID-${this.userId}`);
      }
    })

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
          this.editTask.reset();
        }
      });
    } else {
      this.router.navigate(['dashboard']);
    }

  }

  hasFormValues(): boolean {
    return Object.keys(this.editTask.controls).some(key => {
      const value = this.editTask.get(key)?.value;
      return value !== null && value !== '';
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editTask.patchValue({ taskImage: file });
    }
  }

  currentRecord() {
    this.cds.getTaskById(this.userId).subscribe((res: any) => {
      const userDate = res
      this.editTask.patchValue(res)
    })
  }

}
