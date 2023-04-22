const TodoAction = ({ leftCount, viewState, onChangeViewState }) => {
  //console.log("TodoAction");
  return (
    <div className="w-auto mt-1 d-flex justify-content-between flex-wrap">
      <div className="align-self-center d-none d-sm-block ">
        <span className="badge rounded-pill bg-primary">{leftCount}</span> Items
        left
      </div>
      <div className="btn-group btn-group-sm" role="group">
        <button
          type="button"
          className={
            "btn btn-" + (viewState == "all" ? "" : "outline-") + "dark"
          }
          onClick={() => {
            onChangeViewState("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          className={
            "btn btn-" + (viewState == "uncheck" ? "" : "outline-") + "dark"
          }
          onClick={() => {
            onChangeViewState("uncheck");
          }}
        >
          Active
        </button>
        <button
          type="button"
          className={
            "btn btn-" + (viewState == "check" ? "" : "outline-") + "dark"
          }
          onClick={() => {
            onChangeViewState("check");
          }}
        >
          Completed
        </button>
      </div>
      <div className="btn-group btn-group-sm" role="group">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            onChangeViewState("clear");
          }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoAction;
