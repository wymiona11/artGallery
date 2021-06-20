import { PaintingDataService } from './../services/painting.data.service';
import { PaintingEntityService } from './../services/painting.entity.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPaintingsComponent } from './all-paintings/all-paintings.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

export const paintingsEntityMetadata: EntityMetadataMap = {
  Painting: {

  }
}

@NgModule({
  declarations: [
    AllPaintingsComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    PaintingEntityService,
    PaintingDataService
  ]
})
export class PaintingsModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private paintingDataService: PaintingDataService
    ){
    eds.registerMetadataMap(paintingsEntityMetadata);
    entityDataService.registerService('Painting', paintingDataService)
  }
}
