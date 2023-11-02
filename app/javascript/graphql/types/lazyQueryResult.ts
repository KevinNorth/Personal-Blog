interface LazyQueryResult<Model> {
  data?: Model,
  loading: boolean,
  called: boolean,
}

export default LazyQueryResult;
