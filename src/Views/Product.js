import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Product = () => {

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
        setEquipo({
            loading: true,
            data: []
        });

        if (id)
            url = `${url}?id=${id}`

        const response = await fetch(url);
        try
        {
            const jsonresponse = await response.json();
            setEquipo({
                loading: false,
                data: jsonresponse
            });
        }
        catch(error) {
            console.log(`error: ${error}`);
        }
    }

    if (apidata.loading)
        content = <p>loading ...</p>

    if (!apidata.loading){
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
            </div>
    }
    return(
        <div>{content}</div>
    )
}
export default Product