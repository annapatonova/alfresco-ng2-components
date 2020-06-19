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

import { Injectable } from '@angular/core';
import { AlfrescoApiService, AppConfigService } from '@alfresco/adf-core';
import { SearchConfiguration } from './search-configuration.interface';
import { BaseQueryBuilderService } from './base-query-builder.service';

@Injectable({
    providedIn: 'root'
})
export class SearchQueryBuilderService extends BaseQueryBuilderService {

    public isFilterServiceActive(): boolean {
        return false;
    }

    constructor(appConfig: AppConfigService, alfrescoApiService: AlfrescoApiService) {
        super(appConfig, alfrescoApiService);
    }

    public loadConfiguration(): SearchConfiguration {
        return this.appConfig.get<SearchConfiguration>('search');
    }
}
