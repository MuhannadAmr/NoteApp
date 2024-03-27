import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NotesData } from 'src/app/core/interfaces/notes-data';
import { NotesService } from 'src/app/core/services/notes.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotesData,
    private _NotesService: NotesService,
    private _ToastrService:ToastrService,
  ) { }

  ngOnInit(): void {

  }
  notesForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ? this.data.title : ''),
    content: new FormControl(this.data.content ? this.data.content : '')
  })
  notesSubmit() {

    if(this.data.title && this.data.content){
      this.udateNoteMethod();
    }else{
      this.addNoteMethod();
    }

  }
  
  addNoteMethod(){

    this._NotesService.addNoteAPI(this.notesForm.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.msg , 'Note Added');
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  udateNoteMethod(){

    this._NotesService.updateNoteAPI(this.notesForm.value , this.data._id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.msg , 'Note updated');
        this.dialogRef.close()
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }
}
