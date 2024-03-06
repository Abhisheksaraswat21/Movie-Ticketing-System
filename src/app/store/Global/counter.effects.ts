// import { Injectable } from '@angular/core';
// import { Actions, act, createEffect, ofType } from '@ngrx/effects';

// import {

// } from './counter.action';
// import {
//   EMPTY,
//   catchError,
//   exhaustMap,
//   map,
//   mergeMap,
//   of,
//   switchMap,
// } from 'rxjs';

// // import { EmptyAction, ShowAlert, loadspinner } from "../Global/App.Action"

// @Injectable()
// export class BlogEffects {
//   constructor(
//     private action$: Actions,
//     private service: MasterService,
//     private _snackbar: MatSnackBar
//   ) {}
//   _lodblog = createEffect(() =>
//     this.action$.pipe(
//       ofType(LOAD_BLOG),
//       exhaustMap((action) => {
//         return this.service.GetAllBlogs().pipe(
//           map((data) => {
//             return loadblogsuccess({ bloglist: data });
//           }),
//           catchError((_error) => of(loadblogfail({ Errortext: _error })))
//         );
//       })
//     )
//   );

//   _AddBlog = createEffect(() =>
//     this.action$.pipe(
//       ofType(addblog),
//       exhaustMap((action) => {
//         return this.service.CreateBlog(action.bloginput).pipe(
//           map((data) => {
//             return addblogsuccess({ bloginput: action.bloginput });
//           }),
//           catchError((_error) => of(loadblogfail({ Errortext: _error })))
//         );
//       })
//     )
//   );
