/**
 * @fileoverview A composable function (custom hook) for handling asynchronous data fetching with state management.
 * It provides signals for data, loading status, and errors, along with a function to refetch the data.
 * This is useful for list pages where data might need to be refreshed manually.
 */
import { signal, computed, inject, DestroyRef } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { map, catchError, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Defines the shape of the state managed by the useQuery composable.
 */
export interface QueryState<T> {
  status: 'loading' | 'success' | 'error';
  data?: T;
  error?: string | null;
}

/**
 * Defines the returned object from the useQuery composable.
 */
export interface QueryResult<T> {
  data: ReturnType<typeof computed<T | undefined>>;
  status: ReturnType<typeof computed<'loading' | 'success' | 'error'>>;
  error: ReturnType<typeof computed<string | null | undefined>>;
  isLoading: ReturnType<typeof computed<boolean>>;
  isSuccess: ReturnType<typeof computed<boolean>>;
  isError: ReturnType<typeof computed<boolean>>;
  refetch: () => void;
}

/**
 * A composable function for fetching, caching, and managing asynchronous data.
 * It's inspired by libraries like TanStack Query and provides a reactive way to handle data fetching.
 *
 * @param queryFn A function that returns an Observable of the data to be fetched.
 * @returns An object with signals for the data, status, error, and a refetch function.
 */
export function useQuery<T>(queryFn: () => Observable<T>): QueryResult<T> {
  const destroyRef = inject(DestroyRef);

  const state = signal<QueryState<T>>({
    status: 'loading',
    data: undefined,
    error: null,
  });

  const refetch$ = new Subject<void>();

  refetch$.pipe(
    startWith(undefined), // Trigger initial fetch
    switchMap(() => 
      queryFn().pipe(
        map(data => ({ status: 'success' as const, data, error: null })),
        catchError(err => of({ status: 'error' as const, error: err.message || 'خطایی رخ داد. لطفا دوباره تلاش کنید.', data: undefined })),
        startWith({ status: 'loading' as const, data: state().data, error: null }) // Keep stale data while loading
      )
    ),
    takeUntilDestroyed(destroyRef)
  ).subscribe(newState => {
    state.set(newState);
  });

  return {
    data: computed(() => state().data),
    status: computed(() => state().status),
    error: computed(() => state().error),
    isLoading: computed(() => state().status === 'loading'),
    isSuccess: computed(() => state().status === 'success'),
    isError: computed(() => state().status === 'error'),
    refetch: () => refetch$.next(),
  };
}