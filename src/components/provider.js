import React, { useState } from 'react';
import axios from 'axios'

export const statsContext = React.createContext();

const Provider = props => {
  const [currentData, setCurrentData] = useState(null)
  const [error, setError] = useState(null)

  React.useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const currentResponse = await axios.get(
          "https://node.nodeupdate.com/nodeinfo/currentdata"
        )
        setCurrentData(currentResponse.data[0])
        setTimeout(() => {
          console.log(`Hello ✌(ツ)`)
        }, 400)
      } catch (e) {
        setError(error)
      }
    }
    fetchCurrentData()
  }, [error])

    return (
      <statsContext.Provider value={{
        currentData,
      }}>
      {props.children}
    </statsContext.Provider>
  )

};

export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
);