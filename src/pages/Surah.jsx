import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Main from '../layout/Main';
import Shimmer from '../components/Shimmer';
import { useLocation } from 'react-router-dom';

const Surah = () => {
  const location = useLocation();
  const dataBookmark = JSON.parse(localStorage.getItem('bookmarks'));
  const [bookmarks, setBookmarks] = useState(dataBookmark);

  const [detailSurat, setDetailSurat] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filled, setFilled] = useState(false);
  const [renderedAyatCount, setRenderedAyatCount] = useState(25); // Jumlah maksimal ayat yang akan dirender
  const { id } = useParams();
  const [played, setPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(Array(ayat.length).fill(false));


  const getDetailSurah = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.quran.gading.dev/surah/${id}`);
      setDetailSurat(res.data.data);
      setAyat(res.data.data.verses);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    const openDesc = () => {
        const desc = document.querySelector(".desc")
        desc.classList.toggle("hidden")
    }
    
    const playAudio = async (i, n) => {
        const currentlyPlayingIndex = isPlaying.findIndex((playing) => playing);
        if (currentlyPlayingIndex !== -1) {
          pauseAudio(currentlyPlayingIndex, currentlyPlayingIndex, true);
        }
        const pauseBtn = document.querySelector(".pause"+n);
        const playBtn = document.querySelector(".play"+n)
        await playBtn.classList.toggle("hidden")
        await pauseBtn.classList.toggle("hidden")
        const audio = document.getElementById(`audio${i}`)
        audio.play();
        setIsPlaying((prevIsPlaying) => {
          const newIsPlaying = [...prevIsPlaying];
          newIsPlaying[i] = true;
          return newIsPlaying;
        });
    }
    
    const pauseAudio = (i, n, reset) => {
        document.querySelector(".pause"+n).classList.toggle("hidden")
        document.querySelector(".play"+n).classList.toggle("hidden")
        const audio = document.getElementById(`audio${i}`)
        if (reset) {
            audio.currentTime = 0
        }
        audio.pause();
        setIsPlaying((prevIsPlaying) => {
          const newIsPlaying = [...prevIsPlaying];
          newIsPlaying[i] = false;
          return newIsPlaying;
        });

    }

    const setBookmark = (ayat_id) => {
        const isExist = bookmarks.includes(ayat_id);

        if (!isExist) {
            const newBookmarks = [...bookmarks, ayat_id];
            setBookmarks(newBookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        } else {
            const newBookmarks = bookmarks.filter(item => item !== ayat_id);
            setBookmarks(newBookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        }
    }

    const isMarked = (ayat_id) => {
        return bookmarks.includes(ayat_id) ? 'fa-solid text-emerald-500' : 'fa-regular';
    }

    useEffect(() => {
        getDetailSurah()
    }, [location.key])

  return (
    <Main>
        <div id='_surah' className='md:w-5/12 md:mx-auto bg-white min-h-screen'>
            <nav className='py-6 px-7'>
                <div className='flex gap-2 items-end text-gray-500'>
                    <Link to={"/"}>
                        <i className="fa-solid fa-home"></i>
                        <i className="fa-solid fa-chevron-right ml-2 scale-75 text-slate-400"></i>
                    </Link>
                    <Link to={""} className="text-slate-700 text-sm">{detailSurat?.name?.transliteration?.id}</Link>
                    <div>
                        <span id='clock' className='text-sm'></span>
                    </div>
                </div>
            </nav>
            {loading ? (
                <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                    <div className='text-center'>
                        <Shimmer width="70" height="20" className="mx-auto" />
                        <Shimmer width="90" height="20" className="mt-1 mx-auto" />
                        <div className="flex justify-around items-center">
                            <Shimmer width="20" height="20" className="" />
                            <p className='text-gray-500 text-base mt-2 mb-4'>{detailSurat?.arti}</p>
                            <Shimmer width="20" height="20" className="" />
                        </div>
                        <hr />
                        <Shimmer width="120" height="20" className="mt-2 mx-auto" />
                    </div>
                    <div className='mt-8'>
                        <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                            <div className="flex gap-3 items-center justify-between">
                                <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border overflow-hidden'>
                                    <Shimmer width="80" height="80" className="rounded-full overflow-hidden" />
                                </span>
                                <div className='flex gap-4'>
                                    <Shimmer width="40" height="20" className="" />
                                    <Shimmer width="40" height="20" className="" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Shimmer width="150" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="140" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="220" height="20" className="mt-1 ms-auto" />
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                            <div className="flex gap-3 items-center justify-between">
                                <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border overflow-hidden'>
                                    <Shimmer width="80" height="80" className="rounded-full overflow-hidden" />
                                </span>
                                <div className='flex gap-4'>
                                    <Shimmer width="40" height="20" className="" />
                                    <Shimmer width="40" height="20" className="" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Shimmer width="150" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="140" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="220" height="20" className="mt-1 ms-auto" />
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                            <div className="flex gap-3 items-center justify-between">
                                <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border overflow-hidden'>
                                    <Shimmer width="80" height="80" className="rounded-full overflow-hidden" />
                                </span>
                                <div className='flex gap-4'>
                                    <Shimmer width="40" height="20" className="" />
                                    <Shimmer width="40" height="20" className="" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Shimmer width="150" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="140" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="220" height="20" className="mt-1 ms-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                    <div className='text-center'>
                        <p className='text-gray-800 font-semibold text-2xl nama-surah'>{detailSurat?.name?.short}</p>
                        <p className='text-gray-800 inline font-semibold text-xl mt-2 cursor-pointer hover:underline' onClick={() => openDesc()}>
                            <span className="text-justify">{detailSurat?.name?.transliteration?.id}</span>
                        </p>
                        <div className="flex justify-around items-center">
                            <Link to={`/${detailSurat?.number - 1 == 0 ? 114 : detailSurat?.number - 1}`}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </Link>
                            <p className='text-gray-500 text-base mt-2 mb-4'>{detailSurat?.arti}</p>
                            <Link to={`/${detailSurat?.number + 1 == 115 ? 1 : detailSurat?.number + 1}`}>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                        <hr />
                        <p className='text-gray-500 my-3'>
                            <span>{detailSurat?.revelation?.id}</span> - <span>{detailSurat?.numberOfVerses} ayat</span>
                        </p>
                        <p className='text-gray-500 desc hidden transition-all ease duration-300'>{detailSurat?.tafsir?.id}</p>
                    </div>
                    <div className='mt-8'>
                        {ayat.slice(0, renderedAyatCount).map((a, i) => {
                            return (
                                <div className='py-6 border-b flex-column gap-4 items-start justify-between transition-all ease duration-300' key={i}>
                                    <div className="flex gap-3 items-center justify-between">
                                        <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border'>{a.number.inSurah}</span>
                                        <div className='flex gap-4'>
                                            <span onClick={() => setBookmark(a?.number?.inQuran)} className={`cursor-pointer`}>
                                                <i className={`text-gray-500 fa-sharp ${isMarked(a?.number?.inQuran)} fa-bookmark`}></i>
                                            </span>
                                            <span onClick={() => playAudio(i, i)} className={`cursor-pointer play play${i} ${isPlaying[i] ? 'hidden' : ''}`}>
                                              <i className="text-gray-500 fa-sharp fa-solid fa-play"></i>
                                            </span>
                                            <span onClick={() => pauseAudio(i, i)} className={`cursor-pointer pause pause${i} ${isPlaying[i] ? '' : 'hidden'}`}>
                                              <i className="text-gray-500 fa-sharp fa-solid fa-pause"></i>
                                            </span>
                                            <Link to={`/${detailSurat.number}/${i + 1}`}>
                                                <span>
                                                    <i className="text-gray-500 fa-sharp fa-solid fa-book-open"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className='nama-surah text-2xl mb-5 leading-[4rem]'>{a.text.arab}</p>
                                        <p className='mb-3'>{a.text.transliteration.en}</p>
                                        <p className='text-slate-700 mb-2'>{a.translation.id}</p>
                                        <audio
                                          src={a.audio.primary}
                                          id={`audio${i}`}
                                          className="absolute opacity-0"
                                          controls
                                          onEnded={() => {
                                            setIsPlaying((prevIsPlaying) => {
                                              const newIsPlaying = [...prevIsPlaying];
                                              newIsPlaying[i] = false;
                                              return newIsPlaying;
                                            });
                                          }}
                                        ></audio>
                                    </div>
                                </div>
                            )
                        })}
                        {renderedAyatCount < ayat.length && (
                            <div className="text-center mt-4 mb-8">
                              <button
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => setRenderedAyatCount(renderedAyatCount + 25)}
                              >
                                Muat lebih banyak ayat
                              </button>
                            </div>
                          )}
                    </div>
                </div>
            )}
            
        </div>
    </Main>
  )
}

export default Surah