import { PaintingEntityService } from './../../services/painting.entity.service';
import { Component, OnInit } from '@angular/core';
import { PaintingInterface } from 'src/app/interfaces/painting-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-all-paintings',
  templateUrl: './all-paintings.component.html',
  styleUrls: ['./all-paintings.component.scss']
})
export class AllPaintingsComponent implements OnInit {

  paintings$: Observable<PaintingInterface[]>;
  loading$: Observable<boolean>;
  filterForm: FormGroup;
  searchForm: FormGroup;
  toggler: boolean = true;
  filterSmallScreen: string = '';
  showCount: number = 0;
  displaShowMoreButton: string = '';
  mainColors = ['yellow','white','red','orange','grey','green','blue','black']

  constructor(private paintingEntSer: PaintingEntityService, private fb: FormBuilder) { }

  ngOnInit(): void {

  this.searchForm = this.fb.group({
    searchTitle:[null]
  })

  this.filterForm = this.fb.group({
    category: [null],
    author: [null],
    supportOrSurface:[null],
    mainColor:[null]
  })
  this.filter();
  this.showMore();

  }

  filter(){
    const formVal = this.filterForm.value;
    this.filterChange();
    this.searchForm.reset({
      searchTitle:(null)
    })
    this.paintings$ = this.paintingEntSer.entities$.pipe(
      map(paintings => {
        let paintingsArr = paintings;
        if(formVal.category){
          paintingsArr = paintingsArr.filter(painting => painting.category == formVal.category)
        }
        if(formVal.author){
          paintingsArr = paintingsArr.filter(painting => painting.author == formVal.author)
        }
        if(formVal.supportOrSurface){
          paintingsArr = paintingsArr.filter(painting => painting.supportOrSurface == formVal.supportOrSurface)
        }
        if(formVal.mainColor){
          paintingsArr = paintingsArr.filter(painting => painting.mainColor == formVal.mainColor)
        }
        if(paintingsArr.length > this.showCount){
          let paintingsArr2 = [];
          for(let i=0;i<this.showCount;i++){
            paintingsArr2.push(paintingsArr[i])
          }
          paintingsArr = paintingsArr2;
          this.displaShowMoreButton = '';
        }else{
          this.displaShowMoreButton = 'none';
        }
        return paintingsArr;
      })
    )
  }

  resetFilter(){
    this.searchForm.reset({
      searchTitle:(null)
    })
    this.filterForm.reset({
      category: (null),
      author: (null),
      supportOrSurface:(null),
      mainColor:(null)
    });
    this.filter();
    this.showCount = 0;
    this.showMore();
  }

  showMore(){
    const searchFormVal = this.searchForm.value.searchTitle;
    this.showCount = this.showCount + 10;
    if(!searchFormVal){
      this.filter();
    }
  }

  filterChange(){
    this.toggler =! this.toggler;
    if(this.toggler){
      this.filterSmallScreen = 'filterSmallScreen';
    }
    if(!this.toggler){
      this.filterSmallScreen = '';
    }
  }

  searchTitle(){
    const formVal = this.searchForm.value.searchTitle + '' ;
    this.paintings$ = this.paintingEntSer.entities$.pipe(
      map(
        paintings => {
          let paintingsArr = [];
          paintingsArr = paintings.filter(painting => painting.title.toLowerCase().includes(formVal.toLowerCase()));
          if(paintingsArr.length > this.showCount){
            let paintingsArr2 = [];
            for(let i=0;i<this.showCount;i++){
              paintingsArr2.push(paintingsArr[i])
            }
            paintingsArr = paintingsArr2;
          }else{
            this.displaShowMoreButton = 'none';
          }
          return paintingsArr;
        }
      )
    )
  }

}
