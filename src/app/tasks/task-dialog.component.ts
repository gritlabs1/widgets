import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class TaskDialogComponent {
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['']
  });

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { title: string; description: string }
  ) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  cancel(): void {
    // Add logic to close the dialog, if you are using Angular Material Dialog
    // For example:
    this.dialogRef.close();
  }


  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
