import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Container from '../container/container';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nama_wisata, setNamaWisata] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [foto, setFoto] = useState(null);
    const [newFoto, setNewFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitFormEdit = (e) => {
        e.preventDefault();
        setLoading(true)

        const url = "http://localhost:8000/api/wisatas/";
        const data = new FormData();

        data.append('_method', 'PUT');
        data.append('nama_wisata', nama_wisata);
        data.append('deskripsi', deskripsi);
        if (preview) {
            data.append('foto', newFoto);
        } else {
            data.append('foto', foto);
        }

        try {
            axios.post(url+id, data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }).then(res => {
                if (res.status === 200) {
                    navigate('/');
                }
            })
        } catch {
            alert('Gagal Merubah Data Wisata!');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:8000/api/wisatas/"+id+"/edit").then((res) => {
            console.log(res.data)
            const datas = res.data;
            const result = datas.data;
            setNamaWisata(result.nama_wisata);
            setDeskripsi(result.deskripsi);
            setFoto(result.foto);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (!newFoto) {
            setPreview(undefined)
            return
        }

        const objectURL = URL.createObjectURL(newFoto)
        setPreview(objectURL)

        return () => URL.revokeObjectURL(objectURL)
    }, [newFoto])

    const selectFilesHandler = (e) => {
        if (!e.target.files || e.target.files === 0) {
            setNewFoto(undefined);
            return
        }

        setNewFoto(e.target.files[0]);
    }

    return (
        <Container 
            title='TAMBAH DATA WISATA KUDUS'
            optional={
                <Link to='/' className='btn btn-danger btn-sm'>BATAL</Link>
            }
        >
            <form onSubmit={submitFormEdit}>
                <div className='form-group'>
                    <strong><label>Nama Wisata</label></strong>
                    <input className='form-control' type='text' value={nama_wisata} onChange={e => setNamaWisata(e.target.value)}></input>
                </div>
                <div className='form-group'>
                    <strong><label>Deskripsi</label></strong>
                    <textarea className='form-control' type='textarea' value={deskripsi} onChange={e => setDeskripsi(e.target.value)}></textarea>
                </div>
                <div className='form-group' id='foto'>
                    <strong><label>Foto</label></strong>
                    <div className='text-center align-middle'>
                        {
                            foto && <img className='text-center align-middle' src={!preview ? "http://localhost:8000/"+foto : preview} width='150px'></img>
                        }
                    </div>
                    <input className='form-control mt-2' type='file' name='foto' onChange={selectFilesHandler}></input>
                </div>
                <div className='form-group py-2'>
                    <button type='submit' className='btn btn-success form-control'  disabled={loading}>{loading ? 'LOADING...' : 'SIMPAN'}</button>
                </div>
            </form>
            <ToastContainer />
        </Container>
    );
}

export default Edit;
