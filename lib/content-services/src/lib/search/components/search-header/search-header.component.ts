/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input, OnInit } from '@angular/core';
import { DataColumn } from '@alfresco/adf-core';
import { SearchHeaderQueryBuilderService } from '../../search-header-query-builder.service';
import { SearchQueryBuilderService } from '../../search-query-builder.service';

@Component({
    selector: 'adf-search-header',
    templateUrl: './search-header.component.html',
    providers: [
        {
            provide: SearchQueryBuilderService,
            useClass: SearchHeaderQueryBuilderService
        }
    ]
})
export class SearchHeaderComponent implements OnInit {

    @Input()
    col: DataColumn;

    category: any = {};

    constructor(private searchHeaderQueryBuilder: SearchHeaderQueryBuilderService) {
    }

    ngOnInit() {
       this.category = this.searchHeaderQueryBuilder.getCategoryForColumn(this.col.key);
    }

    onMenuButtonClick(event: Event) {
        event.stopPropagation();
    }
}