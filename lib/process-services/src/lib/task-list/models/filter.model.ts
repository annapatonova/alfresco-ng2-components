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

import { UserTaskFilterRepresentation } from '@alfresco/js-api';

export class AppDefinitionRepresentationModel {
    defaultAppId?: string;
    deploymentId?: string;
    name?: string;
    description?: string;
    theme?: string;
    icon?: string;
    id?: number;
    modelId?: number;
    tenantId?: number;

    constructor(obj?: any) {
        if (obj) {
            this.defaultAppId = obj.defaultAppId ? obj.defaultAppId : null;
            this.deploymentId = obj.deploymentId ? obj.deploymentId : null;
            this.name = obj.name ? obj.name : null;
            this.description = obj.description ? obj.description : null;
            this.theme = obj.theme ? obj.theme : null;
            this.icon = obj.icon ? obj.icon : null;
            this.id = obj.id ? obj.id : null;
            this.modelId = obj.modelId ? obj.modelId : null;
            this.tenantId = obj.tenantId ? obj.tenantId : null;
        }
    }
}

export class FilterParamsModel {
    id?: number;
    name?: string;
    index?: number;

    constructor(obj?: any) {
        if (obj) {
            this.id = obj.id || null;
            this.name = obj.name || null;
            this.index = obj.index;
        }
    }
}

export class FilterRepresentationModel extends UserTaskFilterRepresentation {
    constructor(obj?: any) {
        super(obj);
    }

    hasFilter(): boolean {
        return !!this.filter;
    }
}
