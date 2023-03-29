import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, Link, useParams } from 'react-router-dom'
import Main from '../layout/Main';

const Ayat = () => {

    // const [scrollTop, setScrollTop] = useState(false)
    const [detailSurat, setDetailSurat] = useState([])
    const [detailAyat, setDetailAyat] = useState([])
    
    const {id} = useParams()
    const {ayat} = useParams()

    const getDetailSurah = async () => {
        try {
            const res = await axios.get(`https://api.quran.gading.dev/surah/${id}`)
            setDetailSurat(res.data.data)
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAyat = async () => {
        try {
            const res = await axios.get(`https://api.quran.gading.dev/surah/${id}/${ayat}`)
            console.log(res.data.data);
            setDetailAyat(res.data.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const openDesc = () => {
        const desc = document.querySelector(".desc")
        desc.classList.toggle("hidden")
    }
    
    const playAudio = async (n) => {
        await document.querySelector(".play").classList.toggle("hidden")
        await document.querySelector(".pause").classList.toggle("hidden")
        const audio = document.getElementById(`audio`)
        await audio.play()
        console.log("play");
    }
    
    const pauseAudio = (n) => {
        document.querySelector(".pause").classList.toggle("hidden")
        document.querySelector(".play").classList.toggle("hidden")
        const audio = document.getElementById(`audio`)
        audio.pause()
        console.log("play");
    }

    useEffect(() => {
        getDetailSurah()
        getAyat()      
    }, [])

  return (
    <Main>
        <div className='md:w-5/12 md:mx-auto bg-white min-h-screen'>
            <nav className='py-6 px-7'>
                <div className='flex justify-between text-gray-500'>
                    <div className="flex gap-3">
                        <Link to={"/"}>
                            <i className="fa-solid fa-home"></i>
                        </Link>
                        <Link to={`/${id}`}>
                            <i className="text-gray-500 fa-sharp fa-solid fa-book"></i>
                        </Link>
                    </div>
                    <div>
                        <span id='clock' className='text-sm'></span>
                    </div>
                </div>
            </nav>
            <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                <div className='text-center'>
                        <p className='text-gray-800 font-semibold text-2xl nama-surah'>
                            <span>
                                {detailSurat?.name?.short}
                            </span>
                        </p>
                        <p className='text-gray-800 font-semibold text-lg mt-2'>Ayat ke {ayat}</p>
                    <div className="flex justify-around items-center">
                        <a href={`/${id}/${detailAyat?.number?.inSurah - 1 == 0 ? 1 : detailAyat?.number?.inSurah - 1}`}
                        className={`${detailAyat?.number?.inSurah - 1 < 1 ? 'hidden' : 'inline'}`}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </a>
                        <p className='text-gray-500 text-base mt-2 mb-4'>{detailSurat?.arti}</p>
                        <a href={`/${id}/${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? detailSurat?.numberOfVerses : detailAyat?.number?.inSurah + 1}`}
                        className={`${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? 'hidden' : 'inline'}`}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                    <hr />
                    <p className='text-gray-500 my-3'>
                        <span>{detailSurat?.revelation?.id}</span> - <span>{detailSurat?.numberOfVerses} ayat</span>
                    </p>
                    <p className='text-gray-500 desc hidden'>{detailSurat?.tafsir?.id}</p>
                </div>
                <div className='mt-8'>
                    <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                        <div className="flex gap-3 items-center justify-between">
                            <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border'>{detailAyat?.number?.inSurah}</span>
                            <div className='flex gap-4'>
                                <span onClick={() => playAudio()} className={`cursor-pointer play`}>
                                    <i className="text-gray-500 fa-sharp fa-solid fa-play"></i>
                                </span>
                                <span onClick={() => pauseAudio()} className={`cursor-pointer hidden pause`}>
                                    <i className="text-gray-500 fa-sharp fa-solid fa-pause"></i>
                                </span>
                                {/* <a href={`/${detailSurat.number}/${i + 1}`}>
                                    <span>
                                        <i className="text-gray-500 fa-sharp fa-solid fa-book-open"></i>
                                    </span>
                                </a> */}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className='nama-surah text-2xl mb-5 leading-[4rem]'>{detailAyat?.text?.arab}</p>
                            <p className='mb-3'>{detailAyat?.text?.transliteration?.en}</p>
                            <p className='text-slate-700 mb-2'>{detailAyat?.translation?.id}</p>
                            <div className="text-left">
                                <p className="mt-2">Tafsir: </p>
                                <p className='text-slate-800 mb-2'>{detailAyat?.tafsir?.id?.long}</p>
                            </div>
                            <audio src={detailAyat?.audio?.primary} id={`audio`} className="absolute opacity-0" controls></audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Main>
  )
}

export default Ayat