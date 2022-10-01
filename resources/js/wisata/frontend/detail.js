import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from "../container/container";

function Detail() {
    const { id } = useParams();
    const [nama_wisata, setNamaWisata] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:8000/api/wisatas/"+id+"/detail").then((res) => {
            console.log(res.data)
            const data = res.data;
            const result = data.data;
            setNamaWisata(result.nama_wisata);
            setDeskripsi(result.deskripsi);
            setFoto(result.foto);
        }).catch(err => {
            console.log(err.data)
        })
    }

    return (
        <Container 
            title='DATA WISATA KUDUS'
            optional={
                <Link to='/' className='btn btn-primary btn-sm'>KEMBALI</Link>
            }
        >
            <div>
                <div className='text-center align-middle' style={{marginBottom: '20px'}}>
                    <img className='text-center align-middle' src={"http://localhost:8000/"+foto} width='250px'/>
                </div>
                <div className='text-center align-middle' style={{marginBottom: '20px'}}>
                    <h4><i className='fa fa-pencil-square-o fa-fw' aria-hidden="true"></i><u><strong>NAMA WISATA</strong></u></h4>
                </div>
                <div className='text-center align-middle' style={{marginBottom: '20px'}}>
                    <h4>{nama_wisata}</h4>
                </div>
                <div className='text-center align-middle' style={{marginBottom: '20px'}}>
                    <h4><i className='fa fa-book fa-fw' aria-hidden="true"></i><u><strong>DESKRIPSI</strong></u></h4>
                </div>
                <div style={{textAlign: 'justify'}}>
                    <p>&emsp;&emsp;{deskripsi}</p>
                </div>
            </div>
        </Container>
    );
}

export default Detail;

// const modalStyle = {
//     position: 'relative',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#FFF',
//     padding: '50px',
//     zIndex: 1000
// }

// const overlayModal = {
//     position: 'fixed',
//     top: 0,
//     right: 0,
//     left: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, .7)',
//     zIndex: 1000
// }
