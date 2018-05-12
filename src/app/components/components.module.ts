import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { RangeComponent } from './range/range.component';
import { DonutGraphComponent } from './donut-graph/donut-graph.component';

@NgModule({
    declarations: [
        RangeComponent,
        DonutGraphComponent
    ],
    exports: [
        RangeComponent,
        DonutGraphComponent
    ],
    imports: [
        FormsModule,
        ChartsModule
    ]
})
export class ComponentsModule { }
