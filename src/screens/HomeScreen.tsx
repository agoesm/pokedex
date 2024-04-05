/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Center, FlatList, Spinner} from 'native-base';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

const HomeScreen = () => {
  const [dataPokemon, setDataPokemon] = useState<Pokemon[]>([]);
  const [next, setNext] = useState<string>();
  const [isLoadMore, setIsLoadMore] = useState(false);

  const getDataPokemon = async () => {
    await axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        // console.log('ini res = >', res.data);
        let result = res.data.results.map(data => {
          return {
            name: data.name,
            url: data.url,
          };
        });
        // console.log('poke res => ', result);
        setDataPokemon(result);
        setNext(res.data.next);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log('pokemon ini: ', dataPokemon);

  const loadMoreData = async () => {
    if (isLoadMore) {
      return (
        <Center flex={1}>
          <Spinner size="lg" color="black" />
        </Center>
      );
    }
    if (next) {
      setIsLoadMore(true);
      await axios
        .get(next)
        .then(res => {
          // console.log('ini res next ==>', res.data);
          let result = res.data.results.map(data => {
            return {
              name: data.name,
              url: data.url,
            };
          });
          // console.log('poke res => ', result);
          setDataPokemon(prevPokemon => [...prevPokemon, ...result]);
          setNext(res.data.next);
        })
        .catch(err => {
          console.log(err);
        });

      setIsLoadMore(false);
    }
  };

  useEffect(() => {
    getDataPokemon();
  }, []);

  return (
    <FlatList
      data={dataPokemon}
      keyExtractor={item => item.name}
      numColumns={2}
      renderItem={({item}) => <PokemonCard name={item.name} url={item.url} />}
      onEndReached={loadMoreData}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={() =>
        isLoadMore ? <Spinner mt="4" size="lg" color="black" /> : null
      }
      _contentContainerStyle={{p: 2, bg: 'white'}}
    />
  );
};

export default HomeScreen;
