import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../container/container';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Add() {
    const navigate = useNavigate();
    const [nama_wisata, setNamaWisata] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true)

        const url = "http://localhost:8000/api/wisatas";
        const data = new FormData();

        data.append('nama_wisata', nama_wisata);
        data.append('deskripsi', deskripsi);
        data.append('foto', foto);
        
        try {
            await axios.post(url,data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }).then(res => {
                if (res.status === 200) { // IF Response Data Get 200 OK
                    navigate('/')
                }
            })
            // .catch(err => {
            //     const result = JSON.stringify(err.response.data.errors)
            //     const resultParse = JSON.parse(result)
            //     toast.error(resultParse)
            //     console.log(err.response.data)
            // })
        } catch {
            if (nama_wisata.length === 0 || deskripsi.length === 0 || foto === null) {
                setErrors(true)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!foto) {
            setPreview(undefined)
            return
        }

        const objectURL = URL.createObjectURL(foto)
        setPreview(objectURL)

        return () => URL.revokeObjectURL(objectURL)
    }, [foto])

    const selectFilesHandler = (e) => {
        if (!e.target.files || e.target.files === 0) {
            setFoto(undefined);
            return
        }
        
        setFoto(e.target.files[0]);
    }

    return (
        <Container 
            title='TAMBAH DATA WISATA KUDUS'
            optional={
                <Link to='/' className='btn btn-danger btn-sm'>BATAL</Link>
            }
        >
            <form onSubmit={submitForm}>
                <div className='form-group'>
                    <strong><label>Nama Wisata</label></strong>
                    <input className='form-control' type='text' onChange={e => setNamaWisata(e.target.value)}></input>
                    {errors && nama_wisata.length <= 0 ? <label style={{color: 'RED'}}>Nama Wisata tidak boleh kosong!</label> : ''}
                </div>
                <div className='form-group'>
                    <strong><label>Deskripsi</label></strong>
                    <textarea className='form-control' type='textarea' onChange={e => setDeskripsi(e.target.value)}></textarea>
                    {errors && deskripsi.length <= 0 ? <label style={{color: 'RED'}}>Deskripsi tidak boleh kosong!</label> : ''}
                </div>
                <div className='form-group' id='foto'>
                    <strong><label>Foto</label></strong>
                    <div className='text-center align-middle'>
                        {
                            foto && <img className='text-center align-middle' src={preview} width='150px'></img>
                        }
                    </div>
                    <input className='form-control mt-2' type='file' name='foto' accept='.jpg, .jpeg, .png, .gif' onChange={selectFilesHandler}></input>
                    {errors && foto == null ? <label style={{color: 'RED'}}>Foto tidak boleh kosong!</label> : ''}
                </div>
                <div className='form-group py-2'>
                    <button type='submit' className='btn btn-success form-control' disabled={loading}>{loading ? 'LOADING...' : 'TAMBAH'}</button>
                </div>
            </form>
            <ToastContainer />
        </Container>
    );
}

export default Add;