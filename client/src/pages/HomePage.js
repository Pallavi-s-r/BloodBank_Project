import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/form/spinner'
import Layout from '../components/shared/Layout/LAyout.js'
import Modal from '../components/shared/Modal/Modal'
import API from '../services/api'
import moment from "moment";


const HomePage = () => {
  const { loading, error } = useSelector(state => state.auth)

  const [data, setData] = useState([])

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get('/inventory/bloodRecords')
      if (data?.success) {
        setData(data?.inventory)
        // console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBloodRecords()
  }, []);

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? <Spinner /> :
        (
          <>

            <div className='container'>
              <h4 className='ms-4' data-bs-toggle='modal' data-bs-target='#staticBackdrop' style={{ cursor: "pointer" }}>
                <i className='fa-solid fa-plus text-success py-4'></i>
                Add Inventory</h4>

              {/* table */}

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Time & Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* extracting data */}
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity}ML</td>
                      <td>{record.email}</td>
                      <td>
                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <Modal />
          </>

        )}
    </Layout>
  )
}

export default HomePage