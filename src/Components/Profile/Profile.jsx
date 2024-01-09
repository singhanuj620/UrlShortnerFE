import "./Profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Profile = () => {
  const location = useLocation()
  const [isNewUrl, setIsNewUrl] = useState(false)
  const [newUrl, setNewUrl] = useState()
  const [allUrl, setAllUrl] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const baseUrl = window.location.href.split("/profile")[0]
  const [isCopied, setIsCopied] = useState(false)
  const [indCopied, setIndCopied] = useState(-1)

  useEffect(() => {
    const getNewUrl = new URLSearchParams(location.search).get("shorturl");
    if (getNewUrl) {
      setIsNewUrl(true);
      setNewUrl(getNewUrl);
    }
  }, []);

  const handleGetAllUrl = async () => {
    const resp = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/getallurl`,
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    });
    if (resp && resp?.data && resp?.data?.msg) {
      setIsError(true);
      setErrorMsg(resp.data.msg);
    } else {
      setAllUrl(resp.data.getAllUrl);
      setIsError(false);
      setErrorMsg();
    }
  };

  useEffect(() => {
    handleGetAllUrl();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${baseUrl}/s/${newUrl}`)
    setIsCopied(true)
  }

  const handleIndCopyToClipboard = (ind,shortUrl) => {
    navigator.clipboard.writeText(`${baseUrl}/s/${shortUrl}`)
    setIndCopied(ind)
  }

  return (
    <div>
      {
        isNewUrl && 
        <div className='newShortUrl-container'>
          <div className='newShortUrl-title'>
            Your new short URL is :
          </div>
          <div className='newShortUrl-url'>
            <div>
              {`${baseUrl}/s/${newUrl}`}
            </div>
            <div className='newShortUrl-btns'>
              <Button variant="info" onClick={() => window.open(`${baseUrl}/s/${newUrl}`, '_blank', 'noopener, noreferrer')}>Visit</Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="primary" onClick={() => handleCopyToClipboard()}>{isCopied ? 'Copied !!' : 'Copy'}</Button>
            </div>
          </div>
        </div>
      }

      <div className="allurl-container">
        <div className="allurl-title">Your all short URLs :</div>
        <div className="allurl-table table-wrapper-scroll-y my-custom-scrollbar table-responsive">
          <Table
            className="table table-bordered table-striped mb-0"
            striped
            bordered
            hover
            width="200"
            height="200"
            tdstyle={{ whitespace: "normal", wordwrap: "break-word" }}
            rowstyle={{
              backgroundColor: "#c8e6c9",
              height: "70px",
              padding: "5px 0",
            }}
          >
            <thead className="table-thead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Long Url</th>
                <th scope="col">Short Url</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUrl && allUrl.map((url,ind) => (
                <tr key={ind}>
                  <td>{ind}</td>
                  <td>{url.longUrl}</td>
                  <td>/s/{url.shortUrl}</td>
                  <td>
                    <Button variant="info" onClick={() => window.open(url.longUrl, '_blank', 'noopener, noreferrer')}>Visit</Button>
                    &nbsp;&nbsp;
                    <Button variant="warning" onClick={() => handleIndCopyToClipboard(ind,url.shortUrl)}>{indCopied === ind ? 'Copied' : 'Copy'}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
