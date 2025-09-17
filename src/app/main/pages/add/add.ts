import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerData } from '../../../services/customer-data';
// import { SwalComponent, SwalDirective } from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
  standalone: true,
})
export class Add {

  taskForm!: FormGroup

  constructor(private fb: FormBuilder, private cds: CustomerData) {
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

}
