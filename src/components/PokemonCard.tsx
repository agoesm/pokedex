import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {formatNumber, getTypeColor} from '../utils/helper';

interface PokemonCardProps {
  url: string;
  name: string;
}
interface Pokemon {
  name: string;
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      // front_default: string;
      name: string;
    };
  };
}

const PokemonCard = ({url, name}: PokemonCardProps) => {
  const navigation = useNavigation();
  const [pokemon, setPokemon] = useState<Pokemon>();

  const getDataPokemon = async () => {
    await axios
      .get(url)
      .then(res => {
        console.log('ini res = >', res.data);
        setPokemon(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataPokemon();
  }, [url]);

  if (!pokemon) {
    return null;
  }

  return (
    <Pressable
      flex={1}
      m="1.5"
      p="4"
      borderRadius={10}
      backgroundColor={getTypeColor(pokemon.types[0].type.name) + '.500'}
      onPress={() => navigation.navigate('Detail', {name})}>
      <Center>
        <AspectRatio ratio={1} width="80%">
          <Image
            alt="image"
            source={{
              uri: pokemon.sprites.other['official-artwork'].front_default,
            }}
          />
        </AspectRatio>
      </Center>
      <HStack justifyContent="space-between" mb={2}>
        <Heading textTransform="capitalize" color="white" size="sm">
          {pokemon.name}
        </Heading>
        <Text color="white">#{formatNumber(pokemon.id)}</Text>
      </HStack>
      <HStack>
        {pokemon.types.map(type => (
          <Box
            key={type.type.name}
            px="2"
            mr="1"
            borderRadius={10}
            backgroundColor={getTypeColor(type.type.name) + '.400'}
            _text={{color: 'white', fontSize: 'xs'}}>
            {type.type.name}
          </Box>
        ))}
      </HStack>
    </Pressable>
  );
};

export default PokemonCard;
