import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NotesData } from 'src/app/core/interfaces/notes-data';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  allnotes: NotesData[] = [];
  inputSearch:string='';
  constructor(public dialog: MatDialog,
    private _NotesService: NotesService,
    private _ToastrService:ToastrService
  ) { }
  
  ngOnInit(): void {
    
    this._NotesService.getNotesAPI().subscribe({
      next: (res) => {
        this.allnotes = res.notes
      },
      error: (err) => {
        console.log(err);
        if(err.error.msg === "not notes found"){
          this.allnotes = []
        }
      }
    })
  }

  deleteNote(noteId: any, noteIndex: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    }).then(() => {
      this._NotesService.deleteNoteAPI(noteId).subscribe({
        next: (res) => {
          console.log(res.msg);
          this._ToastrService.success( res.msg ,'Deleted note')
          this.allnotes.splice(noteIndex, 1);
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.ngOnInit()
        }
      })
    })

  }

  updateNote(noteData:NotesData , noteIndex:number){
    this.openDialog(noteData);
  }

  openDialog(noteData?:NotesData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {title:noteData?.title , content:noteData?.content , _id:noteData?._id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
      // this.animal = result;
    });
  }
}
