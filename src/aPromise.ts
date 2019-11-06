interface resolver {
  (resolve: Function, reject?: Function): void;
}
class aPromise {
  constructor(resolver: resolver) {}

  then() {}
  catch() {}
  finally() {}
  all() {}
  race() {}
  resolve() {}
  reject() {}
}
