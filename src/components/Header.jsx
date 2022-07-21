import { useState, createRef, useEffect } from "react";
import Results from './Results';
import arrow from "../../images/icon-arrow.svg";
import axios from "axios";

function Header({onSubmitIPHandler}) {
  const [ip, setIP] = useState("");
  const [ipInfo, setIpInfo] = useState({
    ip: "",
    location: "",
    coords: "",
    timezone: "",
    isp: "",
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 // -- //
  const ValidateIPaddress = () => {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip
      )
    ) return true;
    return false;
  }

  const setValuesFromResponse = async () => {
    try{
      setLoading(true);
      const { data } = await axios(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_Pjdp9AgXwcEzrs8P2e4tibZtMpWuj&ipAddress=${ip}`
      );
      const coords = [data.location.lat, data.location.lng];
      setIpInfo({
        ip: data.ip,
        location: data.location.city,
        timezone: data.location.timezone,
        coords,
        isp: data.isp,
      });
      setIP(data.ip);
      onSubmitIPHandler(coords);
    }catch(e) {
      setError('Woops, looks like something went wrong');
      console.error(e);
    } finally{
      setLoading(false);
    }
  };
  
  const onSubmitIpAddress = () => {
    const validateIP = ValidateIPaddress();
    if (validateIP){setValuesFromResponse(); setError('')}
    else setError('Looks like you wrote an invalid IP Address')
  };
// -- //
  useEffect(() => {
    setValuesFromResponse();
  }, []);
// -- //
  return (
    <div className="header">
      <h1 className="header__title">IP Address tracker</h1>
      <div className="search">
        <input
          placeholder="Search for any IP address or domain"
          className={error ? 'search__input hasError' : 'search__input'}
          onChange={(e) => setIP(e.target.value)}
          value={ip}
          type="text"
          onKeyPress={(e) => (e.key === "Enter" ? onSubmitIpAddress() : () => {})}
        />
        <button className="search__button" onClick={() => onSubmitIpAddress()}>
          <img src={arrow} alt="icon" />
        </button>
      </div>
      {
          error && <span className="error">{error}</span>
      }
      <Results ipInfo={ipInfo} loading={loading} />
    </div>
  );
}

export default Header;