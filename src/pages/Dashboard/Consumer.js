import React , {useEffect, useState}from 'react'
import Layout from '../../components/shared/Layout/LAyout'
import API from '../../services/api'
import moment from 'moment';
import { useSelector } from 'react-redux';


const Consumer = () => {

const {user} = useSelector((state)=>state.auth)
  const [data, setData] = useState([]);
  //find Consumer records
  const getConsumer = async() =>{
  try{
    const {data} = await API.post('/inventory/getInventoryHospital',{
        filters:{
            inventoryType:'out',
            hospital: user?._id
        }
    })
    
    if(data?.success){
    setData(data?.inventory);
    }

  }catch(error){
    console.log(error)
  };
  }
  useEffect(() => {
    getConsumer();
  },[])
  return (
    <Layout>
        <div className='container mt-4'>
         <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Email</th>
                     <th scope="col">Date</th>
                    {/* <th scope="col">Time & Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* extracting data */}
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup }</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity}</td>
                      <td>{record.email}</td>
                      {/* <td>{record.date}</td> */}
                    
                      <td>
                        {moment(record.createdAt).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              </div>
    </Layout>
    
  )
}

export default Consumer