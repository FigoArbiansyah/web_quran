import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../layout/Main';
import BreadCrumbs from '../components/BreadCrumbs';

const Home = () => {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getSurah = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://api.quran.gading.dev/surah');
      setSurah(res.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurah();
  }, []);

  return (
    <Main>
      <div className="md:w-5/12 md:mx-auto bg-white min-h-screen">
        <nav className="py-6 px-7">
          <div className="flex justify-between text-gray-500">
            <BreadCrumbs />
            <div>
              <span id="clock" className="text-sm" />
            </div>
          </div>
        </nav>
        <div className="px-7 pt-6">
          <div>
            <p className="text-gray-500">Al-Quran</p>
            <p className="text-3xl font-semibold mt-2">Baca Surah</p>
          </div>
          <div className="mt-4">
            <form>
              <input type="text" placeholder="Cari Surah" className="w-full py-2 px-4 bg-slate-100 rounded-full focus:outline focus:outline-slate-500 transition-all ease" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
            </form>
          </div>
          {loading ? (
            <div className="mt-8 grid place-items-center">
              <div className="lds-ripple"><div /><div /></div>
            </div>
          ) : (
            <div className="mt-8">
              {surah.filter((_surah) => (search.toLowerCase === '' ? _surah : _surah.name.transliteration.id.toLowerCase().includes(search))).map((_surah) => (
                <Link to={`/${_surah.number}`} key={_surah?.number}>
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 radius flex justify-center items-center border border-emerald-500">
                        <span className="text-slate-500 text-sm">{_surah.number}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{_surah.name.transliteration.id}</p>
                        <p className="text-sm text-slate-500">{_surah.name.translation.id}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-2xl nama-surah">{_surah.name.short}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )};
        </div>
      </div>
    </Main>
  );
};

export default React.memo(Home);
