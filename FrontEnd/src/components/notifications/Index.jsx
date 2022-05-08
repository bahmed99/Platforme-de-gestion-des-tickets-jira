import { React, useState, useEffect } from "react";

import { css } from "@emotion/react";
import CircleLoader from "react-spinners/DotLoader";

import "../../Assets/css/Notifications.css";

import GetNotifications from "../../Actions/GetNotificationsAction";
import DeleteNotification from "../../Actions/DeleteNotificationAction";

export default function Index() {
  const override = css`
    display: flex;
    margin: auto auto auto auto;
    border-color: red;
    align-items: center;
    justify-content: center;
  `;

  const [next, setNext] = useState(7);
  const [prec, setPrec] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let informations = { data: data, setData: setData, setLoading: setLoading };

  useEffect(() => {
    GetNotifications(informations);
  }, []);

  function getDataLength(data) {
    let s = 0;
    for (let i = 0; i < data.lenght; i++) {
      s += data[i].length;
    }
    return s;
  }

  function Delete(i, index) {
    let df = [...data];
    df[i] = data[i].filter((item) => item !== data[i][index]);
    setData(df);

    DeleteNotification(df);
  }

  return (
    <div className="">
      {!loading ? (
        <div className="">
          <div className="nav1">
            <ul>
              <li className="user-post active">Notifications</li>
            </ul>
          </div>
          <div>
            <div>
              <div className="card card-white mb-5">
                <div className="card-body">
                  <ul className="message">
                    {data.map((element, index) =>
                      element.slice(prec, next).map((e, i) => (
                        <li>
                          <div className="media ">
                            <div className="msg-img">
                              <img src={e.img} alt="img" />
                            </div>

                            <div className="notificationsBody">
                              <div>
                                <h5>{e.key}</h5> <div>{e.project}</div>
                              </div>

                              <div className="text-primary">
                                {
                                  <i
                                    className="fa fa-exclamation-triangle"
                                    style={
                                      e.priority === "low"
                                        ? {
                                            color: "#D1D100",
                                            fontSize: "20px",
                                            marginRight: "15px",
                                          }
                                        : e.priority === "medium"
                                        ? {
                                            color: "orange",
                                            fontSize: "20px",
                                            marginRight: "15px",
                                          }
                                        : {
                                            color: "red",
                                            fontSize: "20px",
                                            marginRight: "15px",
                                          }
                                    }
                                  ></i>
                                }
                                {e.msg}{" "}
                              </div>

                              <div>
                                <h5 className="float-right text-primary">
                                  <i
                                    className="fa fa-trash"
                                    onClick={() => Delete(index, i)}
                                    aria-hidden="true"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        setNext(next - 7);
                        setPrec(prec - 7);
                      }}
                      tabindex="-1"
                      disabled={prec === 0 ? true : false}
                    >
                      Previous
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        setNext(next + 7);
                        setPrec(prec + 7);
                      }}
                      disabled={getDataLength(data) <= next ? true : false}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        <div className="sweet-loading">
          <CircleLoader
            color={"#1f212d"}
            loading={loading}
            css={override}
            size={150}
          />
        </div>
      )}
    </div>
  );
}
