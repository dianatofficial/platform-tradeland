/**
 * @fileoverview A composable function (custom hook) for converting an Observable to a set of signals
 * representing the asynchronous operation's state (data, status, error).
 * This is ideal for data that is driven by another source, like router parameters, and doesn't need manual refetching.
 */
import { computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs';

/**
 * The internal state shape for the async operation.
 */
interface AsyncState<T> {
  data: T | undefined;
  status: 'loading' | 'success' | 'error';
  error: string | null;
}

/**
 * The structure of the returned object from the `useAsync` composable.
 */
export interface AsyncResult<T> {
  data: Signal<T | undefined>;
  status: Signal<'loading' | 'success' | 'error'>;
  error: Signal<string | null>;
}

/**
 * A simple composable that subscribes to an observable and provides signals for its state.
 * It uses `toSignal` under the hood.
 *
 * @param source$ The Observable to subscribe to.
 * @returns An object containing signals for data, status, and error.
 */
export function useAsync<T>(source$: Observable<T>): AsyncResult<T> {
  const state = toSignal(
    source$.pipe(
      map(data => ({ status: 'success' as const, data, error: null })),
      catchError(err => of({ status: 'error' as const, error: err.message || 'خطایی رخ داد. لطفا دوباره تلاش کنید.', data: undefined })),
      startWith({ status: 'loading' as const, data: undefined, error: null })
    )
  );
  
  const data = computed(() => state().data);
  const status = computed(() => state().status);
  const error = computed(() => state().error);

  return { data, status, error };
}