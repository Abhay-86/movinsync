import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [seatNumber, setSeatNumber] = React.useState('');
    const [roomNumber, setRoomNumber] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setDescription(result.description);
        setSeatNumber(result.seatNumber);
        setRoomNumber(result.roomNumber)
    }

    const updateProduct = async () => {
        console.warn(name, description, seatNumber, roomNumber)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, description, seatNumber, roomNumber }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='product'>
            <h1>Update Room</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter Description' className='inputBox'
                value={description} onChange={(e) => { setDescription(e.target.value) }}
            />
            
            <input type="text" placeholder='Enter Seat Number' className='inputBox'
                value={seatNumber} onChange={(e) => { setSeatNumber(e.target.value) }} // Update seatNumber
            />
            
            <input type="text" placeholder='Enter Room Number' className='inputBox'
                value={roomNumber} onChange={(e) => { setRoomNumber(e.target.value) }} // Update roomNumber
            />
            {/* <input type="text" placeholder='Enter capacity' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            /> */}


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;