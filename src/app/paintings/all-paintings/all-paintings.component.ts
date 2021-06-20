import { PaintingEntityService } from './../../services/painting.entity.service';
import { Component, OnInit } from '@angular/core';
import { PaintingInterface } from 'src/app/interfaces/painting-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-paintings',
  templateUrl: './all-paintings.component.html',
  styleUrls: ['./all-paintings.component.scss']
})
export class AllPaintingsComponent implements OnInit {

  paintings$: Observable<PaintingInterface[]>;

  constructor(private paintingEntSer: PaintingEntityService, private http: HttpClient) { }

  ngOnInit(): void {
  this.paintings$ = this.paintingEntSer.entities$;


  }

}
