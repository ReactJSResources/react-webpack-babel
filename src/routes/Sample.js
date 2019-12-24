import React, { useState } from 'react';

const Sample = () => {

   const [counter, setCounter] = useState(0);

   return (
     <div>
      Count: {counter}
       <button onClick={() => setCounter(counter + 1)}>Add</button>
     </div>
   );
}
export default Sample;
