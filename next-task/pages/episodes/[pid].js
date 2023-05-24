import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CharactersCard } from '../../components/characters-card';

export default function CharacterProfile() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    router.query.pid &&
      fetch(`https://rickandmortyapi.com/api/episode/${router.query.pid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
  }, [router.query]);

  useEffect(() => {
    if (data !== {}) {
      data.characters?.map((character) => {
        const characterId = character.split('/character/')[1];

        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
          .then((res) => res.json())
          .then((data) => {
            setCharacters((prev) => [...prev, data]);
          });
      });
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1>{data.name}</h1>
        <h2>{data.episode}</h2>
        <h2>
          {new Date(data.air_date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </h2>
        <div style={{ display: 'grid', gridColumn: 2, gap: '10px' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <h3>Informations</h3>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <h3>Cast</h3>
            {characters?.map((character, index) => {
              return (
                <Link href={`/characters/${character.id}`} key={index}>
                  <CharactersCard
                    name={character.name}
                    species={character.species}
                    image={character.image}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
