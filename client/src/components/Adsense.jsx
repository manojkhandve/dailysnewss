import React, { useEffect } from 'react';

const Adsense = ({ client, slot, style }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={style}
         data-ad-client={client}
         data-ad-slot={slot}
         data-ad-format="auto"></ins>
  );
};

export default Adsense;
