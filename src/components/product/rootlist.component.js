import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function RootList() {
  const navigate = useNavigate();

  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [allProduct, setAllproduct] = useState([])

  const [name, setName] = useState("")
  const [parent_id, setParent_id] = useState("")
  // const [image, setImage] = useState(null)
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchList()
  },[])

  const fetchList = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
      const { name, parent_id } = data.product
      setName(name)
      setParent_id(parent_id)
      // alert(parent_id);
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }


  // const updateProduct = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData()
  //   formData.append('_method', 'PATCH');
  //   formData.append('name', name)
  //   formData.append('parent_id', parent_id)
 
  //   await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({data})=>{
  //     Swal.fire({
  //       icon:"success",
  //       text:data.message
  //     })
  //     navigate("/")
  //   }).catch(({response})=>{
  //     if(response.status===422){
  //       setValidationError(response.data.errors)
  //     }else{
  //       Swal.fire({
  //         text:response.data.message,
  //         icon:"error"
  //       })
  //     }
  //   })
  // }

  return (
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Show List </h4>
              <hr />
              <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>id</th>
                                    <th>Parent Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  <tr>
                                      <td>{name}</td>
                                      <td>{id}</td>
                                      <td>{parent_id}</td>
                                  </tr>
                                }
                            </tbody>
                        </table>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}
export default RootList;