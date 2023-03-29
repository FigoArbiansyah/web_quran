import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, Link, useParams } from 'react-router-dom'
import Main from '../layout/Main';

const Surah = () => {

    // const [scrollTop, setScrollTop] = useState(false)
    const [detailSurat, setDetailSurat] = useState([])
    const [ayat, setAyat] = useState([])
    let voice;
    
    const {id} = useParams()

    const getDetailSurah = async () => {
        try {
            const res = await axios.get(`https://api.quran.gading.dev/surah/${id}`)
            setDetailSurat(res.data.data)
            console.log(res.data.data);
            setAyat(res.data.data.verses)
        } catch (error) {
            console.log(error);
        }
    }

    const openDesc = () => {
        const desc = document.querySelector(".desc")
        desc.classList.toggle("hidden")
    }
    
    const playAudio = async (i, n) => {
        await document.querySelector(".play"+n).classList.toggle("hidden")
        await document.querySelector(".pause"+n).classList.toggle("hidden")
        const audio = document.getElementById(`audio${i}`)
        await audio.play()
        console.log("play");
    }
    
    const pauseAudio = (i, n) => {
        document.querySelector(".pause"+n).classList.toggle("hidden")
        document.querySelector(".play"+n).classList.toggle("hidden")
        const audio = document.getElementById(`audio${i}`)
        audio.pause()
        console.log("play");
    }

    useEffect(() => {
        getDetailSurah()
        // window.addEventListener("scroll", () => {
        //     if (window.pageYOffset > 300) {
        //       setScrollTop(true);
        //     } else {
        //       setScrollTop(false);
        //     }
        //   });      
    }, [])

  return (
    <Main>
        <div className='md:w-5/12 md:mx-auto bg-white min-h-screen'>
            <nav className='py-6 px-7'>
                <div className='flex justify-between text-gray-500'>
                    <Link to={"/"}>
                        <i className="fa-solid fa-home"></i>
                    </Link>
                    <div>
                        <span id='clock' className='text-sm'></span>
                    </div>
                </div>
            </nav>
            <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                <div className='text-center'>
                    <p className='text-gray-800 font-semibold text-2xl nama-surah'>{detailSurat?.name?.short}</p>
                        <p className='text-gray-800 font-semibold text-xl mt-2 cursor-pointer hover:underline' onClick={() => openDesc()}>{detailSurat?.name?.transliteration?.id}</p>
                    <div className="flex justify-around items-center">
                        <a href={`/${detailSurat?.number - 1 == 0 ? 114 : detailSurat?.number - 1}`}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </a>
                        <p className='text-gray-500 text-base mt-2 mb-4'>{detailSurat?.arti}</p>
                        <a href={`/${detailSurat?.number + 1 == 115 ? 1 : detailSurat?.number + 1}`}>
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
                    {ayat?.map((a, i) => {
                        return (
                            <div className='py-6 border-b flex-column gap-4 items-start justify-between' key={i}>
                                <div className="flex gap-3 items-center justify-between">
                                    <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border'>{a.number.inSurah}</span>
                                    <div className='flex gap-4'>
                                        <span onClick={() => playAudio(i, i)} className={`cursor-pointer play${i}`}>
                                            <i className="text-gray-500 fa-sharp fa-solid fa-play"></i>
                                        </span>
                                        <span onClick={() => pauseAudio(i, i)} className={`cursor-pointer hidden pause${i}`}>
                                            <i className="text-gray-500 fa-sharp fa-solid fa-pause"></i>
                                        </span>
                                        <a href={`/${detailSurat.number}/${i + 1}`}>
                                            <span>
                                                <i className="text-gray-500 fa-sharp fa-solid fa-book-open"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className='nama-surah text-2xl mb-5 leading-[4rem]'>{a.text.arab}</p>
                                    <p className='mb-3'>{a.text.transliteration.en}</p>
                                    <p className='text-slate-700 mb-2'>{a.translation.id}</p>
                                    <audio src={a.audio.primary} id={`audio${i}`} className="absolute opacity-0" controls></audio>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </Main>
  )
}

export default Surah