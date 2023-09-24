import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/LAyout'
import moment from 'moment'
import API from '../../services/api'

const DonarList = () => {
     const [data, setData] = useState([]);
  //find donar records
  const getDonar = async() =>{
  try{
    const {data} = await API.get('/admin/donarlist')
    // console.log(data)
    if(data?.success){
    setData(data?.donarData);
    }

  }catch(error){
    console.log(error)
  };
  }
  useEffect(() => {
    getDonar();
  },[])


  //dlete

  const handleDelete = async (id) =>{
    try{
       let answer = window.prompt(
        "Are You SUre Want To Delete This Donar",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/deleteDonar/${id}`);
      alert(data?.message);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }
 return (
    <Layout>
         <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                    {/* <th scope="col">Time & Date</th> */}
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
                      <td>
                        <button className='btn btn-danger'   onClick={() => handleDelete(record._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
    </Layout>
 )
}

export default DonarList