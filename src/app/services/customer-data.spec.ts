import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CustomerData } from './customer-data'; // Adjust the import path if needed
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CustomerData Service', () => {
    let service: CustomerData;
    let httpMock: HttpTestingController;
    const mockApiUrl = 'http://localhost:3000/data';

    beforeEach(() => {
        TestBed.configureTestingModule({

            providers: [CustomerData, provideZonelessChangeDetection(), provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        });

        service = TestBed.inject(CustomerData);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure no unmatched requests remain
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch all tasks (getTask)', () => {
        const dummyTasks = [{ id: 1, name: 'Test' }];

        service.getTask().subscribe(tasks => {
            expect(tasks).toEqual(dummyTasks);
        });

        const req = httpMock.expectOne(mockApiUrl);
        expect(req.request.method).toBe('GET');
        req.flush(dummyTasks);
    });

    it('should fetch task by id (getTaskById)', () => {
        const dummyTask = {
            title: "create payment dashboard",
            description: "icici dashbaord",
            priority: "Medium",
            status: "Pending",
            taskImage: null,
            date: "2025-09-17",
            id: "7823"
        };
        const id = 7823;

        service.getTaskById(id).subscribe(task => {
            expect(task).toEqual(dummyTask);
        });

        const req = httpMock.expectOne(`${mockApiUrl}/${id}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyTask);
    });

    it('should add a new task (addTask)', () => {
        const newTask = { name: 'New Task' };

        service.addTask(newTask).subscribe(response => {
            expect(response).toEqual(newTask);
        });

        const req = httpMock.expectOne(mockApiUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newTask);
        req.flush(newTask);
    });

    it('should update a task (updateTask)', () => {
        const id = 1;
        const updatedTask = { name: 'Updated Task' };

        service.updateTask(id, updatedTask).subscribe(response => {
            expect(response).toEqual(updatedTask);
        });

        const req = httpMock.expectOne(`${mockApiUrl}/${id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedTask);
        req.flush(updatedTask);
    });

    it('should delete a task (deleteTask)', () => {
        const id = 1;

        service.deleteTask(id).subscribe(response => {
            expect(response).toEqual({}); // Or whatever your API returns
        });

        const req = httpMock.expectOne(`${mockApiUrl}/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});