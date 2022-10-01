import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../container/container';
import 'react-toastify/dist/ReactToastify.css'

function Index() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const fetchData = () => {
        const url = "http://localhost:8000/api/wisatas";
        axios.get(url).then(res => {
            const result = res.data;
            if (result) {
                setData(result.data)
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const showDetail = (index) => {
        navigate('detail/'+index.id)
    }

    const textOverflow = {
        display: 'inline-block',
        maxWidth: '13ch',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }

    const renderData = () => {
        if (!data) {
            return (
                <tr>
                    <td colSpan='5'>
                        <i className='fa fa-spinner fa-spin fa-lg fa-fw' aria-hidden="true"></i>Loading Data Wisata ...
                    </td>
                </tr>
            )
        }

        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan='5'>
                        Belum Ada Data Wisata, Silahkan Tambahkan Data Baru.
                    </td>
                </tr>
            );
        }

        return data.map((index) => (
            <tr key={index.id} style={{cursor: 'pointer'}}>
                <td onClick={() => showDetail(index)}><strong>{index.id}</strong></td>
                <td onClick={() => showDetail(index)}><strong>{index.nama_wisata}</strong></td>
                <td onClick={() => showDetail(index)}><strong><span style={textOverflow}>{index.deskripsi}</span></strong></td> 
                <td onClick={() => showDetail(index)}><img className='img-thumbnail' src={"http://localhost:8000/"+index.foto} width='50px'/></td>
                <td>
                    <Link to={`/edit/${index.id}`} className='btn btn-warning btn-sm' style={{marginRight: '5px'}}>EDIT</Link>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                        const url = "http://localhost:8000/api/wisatas/";
                        axios.delete(url+index.id)
                        .then(fetchData)
                        .catch(err => {
                            alert('Gagal Menghapus Data Wisata, Dengan ID :' + index.id)
                        })
                    }}>HAPUS</button>
                </td>
            </tr>
        ))
    }

    return (
        <Container 
            title='LIST WISATA KUDUS'
            optional={
                <Link to='/add' className='btn btn-primary btn-sm'>TAMBAH</Link>
            }
        >
            <table className='table table-hover text-center align-middle'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Wisata</th>
                        <th>Deskripsi</th>
                        <th>Foto</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderData()
                    }
                </tbody>
            </table>
        </Container>
    );
}

export default Index;

{/* <Detail open={openModal} onClose={() => setOpenModal(false)}>
    <Container 
            title='DATA WISATA KUDUS'
            optional={
                <Link to='/' className='btn btn-primary btn-sm'>KEMBALI</Link>
            }
        >
            <h1>TEST</h1>
            <button onClick={() => setOpenModal(false)}>CLOSE</button>
    </Container>
</Detail> */}
