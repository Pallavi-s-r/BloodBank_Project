import React , {useEffect, useState}from 'react'
import Layout from '../../components/shared/Layout/LAyout'
import API from '../../services/api'
import moment from 'moment';


const Donar = () => {

  const [data, setData] = useState([]);
  //find donar records
  const getDonar = async() =>{
  try{
    const {data} = await API.get('/inventory/getDonar')
    // console.log(data)
    if(data?.success){
    setData(data?.donars);
    }

  }catch(error){
    console.log(error)
  };
  }
  useEffect(() => {
    getDonar();
  },[])
  return (
    <Layout>
         <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {/* extracting data */}
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.name || record.organisationName + " {Org}"}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                    
                      <td>
                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
    </Layout>
    
  )
}

export default Donar