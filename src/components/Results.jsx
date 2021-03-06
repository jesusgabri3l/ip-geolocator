import Loading from "./Loading";
function Results({ ipInfo, loading }) {
  return (
    <div className="results">
      {loading ? (
        <div style={ {display: 'flex', justifyContent : 'center', width: '100%'} }>
            <Loading />
        </div>
      ) : (
        <>
          <div className="result">
            <small className="result__title">ip address</small>
            <p className="result__text">{ipInfo.ip}</p>
          </div>
          <div className="result">
            <small className="result__title">location</small>
            <p className="result__text">
              {ipInfo.location || "No location registered"}
            </p>
          </div>
          <div className="result">
            <small className="result__title">timezone</small>
            <p className="result__text">
              {ipInfo.timezone || "No timezone registered"}
            </p>
          </div>
          <div className="result">
            <small className="result__title">ISP</small>
            <p className="result__text">{ipInfo.isp || "No ISP registered"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Results;
