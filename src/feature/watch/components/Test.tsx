import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Test = () => {
  return (
    <InfiniteScroll
            dataLength={30} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={isLoading && <p>Loading...</p>}
            scrollThreshold={0.8}
            scrollableTarget="window"
        >
            <ul className="mt-10">
                <li>Comment 01</li>
                <li>Comment 01</li>
                <li>Comment 01</li>
                <li>Comment 01</li>
                <li>Comment 01</li>
                <li>Comment 01</li>
            </ul>
        </InfiniteScroll>
  )
}

export default Test