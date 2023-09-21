import React , {useEffect, useState}from 'react'
import Layout from '../../components/shared/Layout/LAyout'
import API from '../../services/api'
import moment from 'moment';


const Organisation = () => {

  const [data, setData] = useState([]);
  //find Organisation records
  const getOrg = async() =>{
  try{
    const {data} = await API.get('/inventory/getOrg')
    //  console.log(data)
    if(data?.success){
      
    setData(data?.organisations);
    }

  }catch(error){
    console.log(error)
  };
  }
  useEffect(() => {
    getOrg();
  },[]);

  
  return (
    <Layout>
         <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                    <th scope="col">Date</th>
                    {/* <th scope="col">Time & Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* extracting data */}
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.organisationName}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td>{record.address}</td>
                    
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

export default Organisation