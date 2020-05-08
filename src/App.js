import React, {useEffect, useState} from "react";
import api from './services/api';

import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";

import Repository from './components/Repository';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);

    const repositoriesUpdated = repositories
      .map(repository => {
        if(repository.id === id){
          repository.likes = response.data.likes;
          return repository;
        } else {
          return repository;
        }
      });
    setRepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={
            ({ item:repository }) => Repository(repository, () => handleLikeRepository(repository.id))
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
});
