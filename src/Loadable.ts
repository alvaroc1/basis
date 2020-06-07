
type Loadable <A> = Empty<A> | Loaded<A>

class Empty <A> {
  tag = 'Initial' as const

  fold = <X>(emptyFn: () => X, _loadedFn: (value: A, isLoading: boolean) => X): X => emptyFn()
  map = <B> (_fn: (value: A) => B): Loadable<B> => Loadable.empty
}

class Loaded <A> {
  tag = 'Loaded'
  constructor (readonly value: A, readonly isLoading: boolean) {}

  fold = <X>(_emptyFn: () => X, loadedFn: (value: A, isLoading: boolean) => X): X => loadedFn(this.value, this.isLoading)
  map = <B> (fn: (value: A) => B): Loadable<B> => new Loaded(fn(this.value), this.isLoading)
}

namespace Loadable {
  export const empty: Loadable<never> = new Empty<never>()
  export const loaded = <A>(value: A): Loadable<A> => new Loaded(value, false)
}

export default Loadable
