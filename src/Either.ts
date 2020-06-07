type Either <L,R> = Left<L,R> | Right<L,R>

class Left <L,R> {
  tag = 'Left' as const
  constructor (readonly value: L) {}
  fold = <A>(leftFn: (l: L) => A, _rightFn: (v: R) => A): A => leftFn(this.value)
  map = <A> (_fn: (v: R) => A): Either<L,A> => Either.left(this.value)
  mapLeft = <A> (fn: (v: L) => A): Either<A,R> => Either.left(fn(this.value))
}

class Right <L,R> {
  tag = 'Right' as const
  constructor (readonly value: R) {}
  fold = <A>(_leftFn: (l: L) => A, rightFn: (v: R) => A): A => rightFn(this.value)
  map = <A> (fn: (v: R) => A): Either<L,A> => Either.right(fn(this.value))
  mapLeft = <A> (fn: (v: L) => A): Either<A,R> => Either.right(this.value)
}

namespace Either {
  export const left = <A,never> (v: A): Either<A,never> => new Left(v)
  export const right = <A,never> (v: A): Either<never,A> => new Right(v)
}

export default Either