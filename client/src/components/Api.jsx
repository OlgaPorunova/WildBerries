import React, { useEffect, useState } from 'react';

export default function Api() {
  const [whisky, setWhisky] = useState([]);
  const clickHandler = (e) => {

  };

  useEffect(() => {
    fetch('/users/whisky')
      .then((response) => response.json())
      .then((data) => {
        setWhisky(data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="cont" style={{ marginTop: '200px', color: 'black' }}>
      <div>
        {whisky?.map((el) => (
          <div
            className="card"
            style={{
              width: '28rem', backgroundColor: 'rgb(247, 213, 227)', position: 'relative', left: '400px',
            }}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: '150%', color: 'rgb(4, 95, 95)' }}>{el.name}</h5>
              <p className="card-text" style={{ fontSize: '150%', color: 'rgb(3, 99, 99)' }}>
                name:
                {' '}
                {el.name}
              </p>
              <p className="card-text" style={{ fontSize: '150%', color: 'rgb(3, 99, 99)' }}>
                priceU:
                {' '}
                {el.priceU}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
