import React, { useEffect } from 'react';
import client from '../Sanityclient/client';

const Test = () => {
  useEffect(() => {
    client
      .fetch(`*[_type == "groupMember"]{ _id, name }`)
      .then((data) => {
        console.log("Fra sanitydatabase:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div>
      <h1>Tester om dette funker</h1>
      <p>Sjekker om alt funnker, inkl console.</p>
    </div>
  );
};

export default Test;
