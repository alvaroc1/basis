type Optional<A> = None<A> | Some<A>

class None<A> {
  tag = 'None' as const

  map = <B> (fn: (v: A) => B): Optional<B> => Optional.empty
  flatMap = <B> (fn: (v: A) => Optional<B>): Optional<B> => Optional.empty
}

class Some <A> {
  tag = 'Some' as const
  constructor (readonly value: A) {}

  map = <B> (fn: (v: A) => B): Optional<B> => Optional.some(fn(this.value))
  flatMap = <B> (fn: (v: A) => Optional<B>): Optional<B> => fn(this.value)
}

namespace Optional {
  export const empty = new None() as Optional<never>
  export const some = <A> (v: A): Optional<A> => new Some(v)

  export const zip2 = <A,B> (oa: Optional<A>, ob: Optional<B>): Optional<[A,B]> =>
    oa.flatMap(a => ob.map(b => [a,b]))

  export const zip3 = <A,B,C> (oa: Optional<A>, ob: Optional<B>, oc: Optional<C>): Optional<[A,B,C]> =>
    zip2(zip2(oa, ob), oc).map(([[a,b],c]) => [a,b,c])

  export const zip4 = <A,B,C,D> (oa: Optional<A>, ob: Optional<B>, oc: Optional<C>, od: Optional<D>): Optional<[A,B,C,D]> =>
    zip2(zip3(oa, ob, oc), od).map(([[a,b,c],d]) => [a,b,c,d])

  export const zip5 = <A,B,C,D,E> (oa: Optional<A>, ob: Optional<B>, oc: Optional<C>, od: Optional<D>, oe: Optional<E>): Optional<[A,B,C,D,E]> =>
    zip2(zip4(oa, ob, oc, od), oe).map(([[a,b,c,d],e]) => [a,b,c,d,e])
}

export default Optional
