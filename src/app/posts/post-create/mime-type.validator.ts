import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

 /**
  * Image Validator.
  */
export const mimeType = (
  control: AbstractControl
  ): Promise<{[key: string]: any }> | Observable<{[key: string]: any}>  => {
    //  mimeType function returns async Promise/Observable
    // Promise should have a value that has a 'key' string, we don't
    //  care about name. aka dynamic prop name
    if (typeof(control.value) === 'string') {
      return of(null); // Observable
    }
    const file = control.value as File;
    const fileReader = new FileReader();
    // Convert a sync function to an observable
    const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
      fileReader.addEventListener('loadend',  () => {
        // Allows us to access certain patterns in the file.
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        let isValid = false;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    });
    return frObs;
  };
