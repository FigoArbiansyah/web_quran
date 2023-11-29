import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Main from '../layout/Main';
import ShimmerDetailAyah from '../components/ShimmerDetailAyah';
import Breadcrumbs from '../components/BreadCrumbs';

const Ayat = () => {
  const location = useLocation();
  const { id, ayat } = useParams();

  const [detailSurat, setDetailSurat] = useState([]);
  const [detailAyat, setDetailAyat] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailSurah = async () => {
    setLoading(true);
    try {
      const request = await fetch(`https://api.quran.gading.dev/surah/${id}`);
      const response = await request.json();
      setDetailSurat(response.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  const getAyat = async () => {
    setLoading(true);
    try {
      const request = await fetch(`https://api.quran.gading.dev/surah/${id}/${ayat}`);
      const response = await request.json();
      setDetailAyat(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = document.getElementById('audio');
    audio.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    const audio = document.getElementById('audio');
    audio.pause();
    setIsPlaying(false);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setLoading(true);
    getDetailSurah();
  }, []);

  useEffect(() => {
    setLoading(true);
    getAyat();
  }, [location.key]);

  console.log(detailSurat, detailAyat);

  const link = {
    title: `${detailSurat?.name?.transliteration?.id ?? '-'} : ${detailAyat?.number?.inSurah ?? '-'}` ?? '-',
    path: `/surah/${detailSurat?.number}`,
  };

  return (
    <Main>
      <div className="md:w-5/12 md:mx-auto bg-white min-h-screen">
        <nav className="py-6 px-7">
          <div className="flex justify-between text-gray-500">
            <Breadcrumbs link={link} loading={loading} />
            <div>
              <span id="clock" className="text-sm" />
            </div>
          </div>
        </nav>
        {loading ? (
          <ShimmerDetailAyah />
        ) : (
          <div className="px-7 pt-6" style={{ overflow: 'hidden' }}>
            <div className="text-center">
              <p className="text-gray-800 font-semibold text-2xl nama-surah">
                <span>
                  {detailSurat?.name?.short}
                </span>
              </p>
              <p className="text-gray-800 font-semibold text-lg mt-2">Ayat ke {ayat}</p>
              {!loading && id && detailAyat?.number?.inSurah && (
                <div className="flex justify-around items-center">
                  <Link
                    to={`/surah/${id}/${detailAyat?.number?.inSurah - 1 === 0 ? 1 : detailAyat?.number?.inSurah - 1}`}
                    className={`${detailAyat?.number?.inSurah - 1 < 1 ? 'hidden' : 'inline'}`}
                  >
                    <i className="fa-solid fa-arrow-left" />
                  </Link>
                  <p className="text-gray-500 text-base mt-2 mb-4">{detailSurat?.arti}</p>
                  <Link
                    to={`/surah/${id}/${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? detailSurat?.numberOfVerses : detailAyat?.number?.inSurah + 1}`}
                    className={`${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? 'hidden' : 'inline'}`}
                  >
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              )}
              <hr />
              <p className="text-gray-500 my-3">
                <span>
                  {detailSurat?.revelation?.id}
                </span> - <span>{detailSurat?.numberOfVerses} ayat</span>
              </p>
              <p className="text-gray-500 desc hidden">{detailSurat?.tafsir?.id}</p>
            </div>
            <div className="mt-8">
              <div className="py-6 border-b flex-column gap-4 items-start justify-between">
                <div className="flex gap-3 items-center justify-between">
                  <span className="flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border">{detailAyat?.number?.inSurah}</span>
                  <div className="flex gap-4">
                    <span
                      onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                      className="cursor-pointer"
                    >
                      {isPlaying ? (
                        <i className="text-gray-500 fa-sharp fa-solid fa-pause" />
                      ) : (
                        <i className="text-gray-500 fa-sharp fa-solid fa-play" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="nama-surah text-2xl mb-5 leading-[4rem]">
                    {detailAyat?.text?.arab}
                  </p>
                  <p className="mb-3">
                    {detailAyat?.text?.transliteration?.en}
                  </p>
                  <p className="text-slate-700 mb-2">
                    {detailAyat?.translation?.id}
                  </p>
                  <div className="text-left">
                    <p className="mt-2">Tafsir: </p>
                    <p className="text-slate-800 text-justify mb-2">{detailAyat?.tafsir?.id?.long}</p>
                  </div>
                  <audio src={detailAyat?.audio?.primary} id="audio" className="absolute opacity-0" controls onEnded={handleAudioEnded} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default React.memo(Ayat);
