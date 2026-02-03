import React, { useEffect, useState } from "react";
import { api } from "./api";
import Style from "./pagination.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ fetchingData, getSerialNo, limit }) => {
  const [isPage, setPage] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [leftPagesState, setLeftPageState] = useState([]);
  const [rightPageState, setRightPageState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCurrentPageVisible, setCurrentPageVisible] = useState(false);

  const getUserCountFromServer = async () => {
    try {
      const res = await api.get("/usercount");
      const { totalUser } = res.data;
      return totalUser;
    } catch (error) {
      console.log(error);
    }
  };

  const paginationOperation = async (currPage) => {
    setCurrentPage(currPage);

    const pageCount = getPage(await getUserCountFromServer(), limit);

    setPage(pageCount >= 2);
    setTotalPage(pageCount);

    const leftPageinfo = getLeftPage(currPage, pageCount);
    const rightPageInfo = getRightPage(currPage, pageCount);

    setLeftPageState(createLeftPage(leftPageinfo, currPage));
    setRightPageState(createRightPage(rightPageInfo, currPage));

    setCurrentPageVisible(currPage !== 1 && currPage !== pageCount);
  };

  useEffect(() => {
    const init = async () => {
      await paginationOperation(1);
    };

    init();
  }, []);

  return (
    <>
      {isPage && (
        <div className={Style.pagination_container}>
          <div>
            <button
              className={Style.pagination_control_btn}
              disabled={currentPage === 1}
              onClick={() => {
                const previousPage = currentPage - 1;
                paginationOperation(previousPage);
                fetchingData(previousPage, limit);
                getSerialNo(previousPage, limit);
              }}
            >
              <FaChevronLeft /> &nbsp;Previous
            </button>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <button
              className={`${Style.page_btn} ${
                currentPage === 1 && Style.current_page
              }`}
              onClick={() => {
                paginationOperation(1);
                fetchingData(1, limit);
                getSerialNo(1, limit);
              }}
            >
              1
            </button>
          </div>
          {leftPagesState
            .slice()
            .reverse()
            .map((page, index) => (
              <div key={index}>
                <button
                  className={Style.page_btn}
                  disabled={page.props.children === "..."}
                  onClick={() => {
                    paginationOperation(page.props.children);
                    fetchingData(page.props.children, limit);
                    getSerialNo(page.props.children, limit);
                  }}
                >
                  {page.props.children}
                </button>
              </div>
            ))}
          {isCurrentPageVisible && (
            <div>
              <button className={`${Style.page_btn} ${Style.current_page}`}>
                {currentPage}
              </button>
            </div>
          )}
          {rightPageState.map((page, index) => (
            <div key={index}>
              <button
                className={Style.page_btn}
                disabled={page.props.children === "..."}
                onClick={() => {
                  paginationOperation(page.props.children);
                  fetchingData(page.props.children, limit);
                  getSerialNo(page.props.children, limit);
                }}
              >
                {page.props.children}
              </button>
            </div>
          ))}
          <div>
            <button
              className={`${Style.page_btn} ${
                currentPage === totalPage && Style.current_page
              }`}
              onClick={() => {
                paginationOperation(totalPage);
                fetchingData(totalPage, limit);
                getSerialNo(totalPage, limit);
              }}
            >
              {totalPage}
            </button>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <button
              className={Style.pagination_control_btn}
              disabled={currentPage === totalPage}
              onClick={() => {
                const nextPage = currentPage + 1;
                paginationOperation(nextPage);
                fetchingData(nextPage, limit);
                getSerialNo(nextPage, limit);
              }}
            >
              Next &nbsp;
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;

// Helper functions
const createLeftPage = ({ boxCount, isEmptyBox }, currentPage) => {
  const pages = [];
  let temp = currentPage;

  for (let i = 1; i <= boxCount; i++) {
    pages.push(<div key={`left-${i}`}>{temp - 1}</div>);
    temp -= 1;
  }

  if (isEmptyBox) pages.push(<div key="left-dots">...</div>);

  return pages;
};

const createRightPage = ({ boxCount, isEmptyBox }, currentPage) => {
  const pages = [];
  let temp = currentPage;

  for (let i = 1; i <= boxCount; i++) {
    pages.push(<div key={`right-${i}`}>{temp + 1}</div>);
    temp += 1;
  }

  if (isEmptyBox) pages.push(<div key="right-dots">...</div>);

  return pages;
};

const getPage = (totalData, limit) => Math.ceil(totalData / limit);

const getLeftPage = (page, totalPage) => {
  if (page - 2 >= 4) {
    if (page === totalPage) return { isEmptyBox: true, boxCount: 4 };
    if (page === totalPage - 1) return { isEmptyBox: true, boxCount: 3 };
    return { isEmptyBox: true, boxCount: 2 };
  }
  if (page - 2 > 0) return { isEmptyBox: false, boxCount: page - 2 };
  return { isEmptyBox: false, boxCount: 0 };
};

const getRightPage = (page, totalPage) => {
  if (totalPage - (page + 1) >= 4) {
    if (page === 1) return { isEmptyBox: true, boxCount: 4 };
    if (page === 2) return { isEmptyBox: true, boxCount: 3 };
    return { isEmptyBox: true, boxCount: 2 };
  }
  if (page !== totalPage - 1 && page !== totalPage)
    return { isEmptyBox: false, boxCount: totalPage - (page + 1) };
  return { isEmptyBox: false, boxCount: 0 };
};
