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

import {
    ApiService,
    ApplicationsUtil,
    BrowserActions,
    LoginPage,
    ProcessUtil,
    UsersActions,
    Widget
} from '@alfresco/adf-testing';
import { TasksPage } from '../pages/tasks.page';
import { browser } from 'protractor';
import CONSTANTS = require('../../util/constants');

describe('Date and time widget', () => {

    const app = browser.params.resources.Files.WIDGET_CHECK_APP.DATETIME;

    const loginPage = new LoginPage();
    const taskPage = new TasksPage();
    const widget = new Widget();

    const apiService = new ApiService();
    const usersActions = new UsersActions(apiService);
    const applicationsService = new ApplicationsUtil(apiService);

    let processUserModel;
    let appModel;
    let deployedApp, process;

    beforeAll(async () => {
       await apiService.getInstance().login(browser.params.testConfig.admin.email, browser.params.testConfig.admin.password);

       processUserModel = await usersActions.createUser();

       await apiService.getInstance().login(processUserModel.email, processUserModel.password);
       appModel = await applicationsService.importPublishDeployApp(browser.params.resources.Files.WIDGET_CHECK_APP.file_path);

       const appDefinitions = await apiService.getInstance().activiti.appsApi.getAppDefinitions();
       deployedApp = appDefinitions.data.find((currentApp) => {
            return currentApp.modelId === appModel.id;
        });
       process = await new ProcessUtil(apiService).startProcessByDefinitionName(appModel.name, app.processName);
       await loginPage.login(processUserModel.email, processUserModel.password);
   });

    beforeEach(async () => {
        const urlToNavigateTo = `${browser.baseUrl}/activiti/apps/${deployedApp.id}/tasks/`;
        await BrowserActions.getUrl(urlToNavigateTo);
        await taskPage.filtersPage().goToFilter(CONSTANTS.TASK_FILTERS.MY_TASKS);
        await taskPage.formFields().checkFormIsDisplayed();
    });

    afterAll(async () => {
        await apiService.getInstance().activiti.processApi.deleteProcessInstance(process.id);
        await apiService.getInstance().login(browser.params.testConfig.admin.email, browser.params.testConfig.admin.password);
        await apiService.getInstance().activiti.adminTenantsApi.deleteTenant(processUserModel.tenantId);
    });

    it('[C268818] Should be able to set general settings for Date Time widget', async () => {
        await expect(await widget.dateTimeWidget().getDateTimeLabel(app.FIELD.date_time_input)).toContain('Date');
        await expect(await taskPage.formFields().isCompleteFormButtonEnabled()).toEqual(false);

        await widget.dateTimeWidget().openDatepicker(app.FIELD.date_time_input);
        await widget.dateTimeWidget().selectDay('10');
        await widget.dateTimeWidget().selectHour('8');
        await widget.dateTimeWidget().selectMinute('30');
        await expect(await taskPage.formFields().isCompleteFormButtonEnabled()).toEqual(true);

        await expect(await widget.dateTimeWidget().getPlaceholder(app.FIELD.date_time_between_input)).toBe('Choose anything...');
    });

    it('[C268819] Should be able to set advanced settings for Date Time widget ', async () => {
        await widget.dateTimeWidget().openDatepicker(app.FIELD.date_time_between_input);
        await widget.dateTimeWidget().closeDataTimeWidget();

        await widget.dateTimeWidget().setDateTimeInput(app.FIELD.date_time_between_input, '20-03-17 07:30 PM');
        await taskPage.formFields().saveForm();
        await expect(await widget.dateTimeWidget().getErrorMessage(app.FIELD.date_time_between_input)).toContain('Can\'t be less than');

        await widget.dateTimeWidget().openDatepicker(app.FIELD.date_time_between_input);
        await widget.dateTimeWidget().closeDataTimeWidget();
        await widget.dateTimeWidget().removeFromDatetimeWidget(app.FIELD.date_time_between_input);

        await browser.refresh();

        await widget.dateTimeWidget().setDateTimeInput(app.FIELD.date_time_between_input, '20-03-19 07:30 PM');
        await widget.dateTimeWidget().closeDataTimeWidget();

        await taskPage.formFields().saveForm();

        await expect(await widget.dateTimeWidget().getErrorMessage(app.FIELD.date_time_between_input)).toContain('Can\'t be greater than');
    });
});
