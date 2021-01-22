import React from 'react'
import { useParams, Link } from 'react-router-dom'

const  Product = () => {

    const [apidata, setEquipo] = React.useState({
        loading: false,
        data:[]
    })

    let content = null

    const { id } = useParams()
    console.log('params: ' + id)

    //let url = `http://localhost:3001/comments?id=${id}`
    let url = `http://localhost:3001/comments`

    React.useEffect(() => {
        //console.log('use efect')
        obtenerDatos();
    },[])

    const obtenerDatos = async () => {
        if (id)
            url = `${url}?id=${id}`
        const response = await fetch(url);
        const jsonresponse = await response.json();
        setEquipo({
            loading: false,
            data: jsonresponse
        });
        console.log(jsonresponse);
    }

    if (apidata){
        content = 
        <div>
            <h1>Product</h1>
            <ul>
                {
                    apidata.data.map(
                        item => (
                            <li key={item.id}>
                                <Link to={`/product/${item.id}`}>{item.id} - {item.body}</Link>
                            </li>
                        )
                    )
                }
            </ul>
        </div>    }
    return(
        <div>{content}</div>
    )
}
export default Product