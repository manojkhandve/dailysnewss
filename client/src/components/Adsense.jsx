import React, { useEffect } from 'react';

const AdSense = () => {
useEffect(() => {

if (window) {

(window.adsbygoogle = window.adsbygoogle || []).push({});

}

}, []);

return (

<div className="adsense">
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4869219856930437"
     data-ad-slot="3215122285"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
);
};

export default AdSense;