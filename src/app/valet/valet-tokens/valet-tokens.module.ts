import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ValetTokensComponent } from './valet-tokens.component';
import { Routes, RouterModule } from '@angular/router';
import { ValetTokensDialogComponent } from './valet-tokens-dialog/valet-tokens-dialog.component';
import { AngularMaterialModule } from "../../angular-material/angular-material.module";

const valet_tokens_routes: Routes = [
  {
    path: '',
    data: {
      title: 'Valet-Tokens',
      urls: [
        { title: 'Valet-Tokens', url: '/valet-tokens' }
      ]
    },
    component: ValetTokensComponent
  }
];


@NgModule({
  declarations: [
    ValetTokensComponent,
    ValetTokensDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(valet_tokens_routes),
  ]
})
export class ValetTokensModule { }
